"use client";

import { ACCEPTED_EXTENSIONS, MAX_FILES, MAX_SIZE_MB, OPTIONS, type IOption } from "./constants";
import { IoReturnDownForward, IoReturnDownBack, IoEllipsisVertical } from "react-icons/io5";
import generateRandomString from "@/lib/utils/other/generateRandomString";
import fetchCookies from "@/lib/utils/components/chatbot/fetchCookies";
import getResponseError from "@/lib/utils/other/getResponseError";
import UploadDocument from "./ui/file_selector/UploadDocument";
import TextFileViewer from "./ui/file_selector/TextFileViewer";
import { chatbot_File } from "@/types/components/ai_chatbot";
import { useEffect, useState, useRef } from "react";
import { FileStatus, IFile } from "@/types/store";
import { useAiChat } from "@/store/useAiChat";
import useDocument from "@/store/useDocument";
import useUser from "@/store/useUser";
import FileModal from "./FileModal";
import Chatbot from "./ui/chatbot";
import cn from "@/lib/tailwind/cn";
import { Toaster } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export default function AiChatbot() {
    const {
        files,
        setFile,
        updateFileProgress,
        updateFileStatus,
        updateFileId,
        filesToProcess,
        resetFiles,
        setFiles,
        setSelectedFile,
        selectedFile,
        removeFile,
    } = useDocument();
    const [option, setOption] = useState<IOption>("Upload A Document");
    const [showDocument, toggleDocument] = useState<boolean>(true);
    const { user } = useUser();
    const [sessionId, setSessionId] = useState<string>("");
    const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { id, setId, setChats, chats, setSelectedChat, setMessages } = useAiChat();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (files.length > 0) {
            console.log("files: ", files);
            setSelectedFile(files[files.length - 1]);
            toggleDocument(true);
        } else if (filesToProcess.length > 0 && filesToProcess[filesToProcess.length - 1].contents) {
            console.log("content gotten for file: ", filesToProcess[filesToProcess.length - 1]);
            setSelectedFile(filesToProcess[filesToProcess.length - 1]);
            toggleDocument(true);
        } else {
            toggleDocument(false);
            setSelectedFile(null);
        }
    }, [files]);

    useEffect(() => {
        if (!user) return;

        const fetchFiles = async () => {
            const { result, error } = await getResponseError("/db/firebase/firestore/components/ai_chatbot/getChats", [user.uid]);
            if (!result) return console.warn("error: ", error);

            console.log("result: ", result.chats);
            setChats(result.chats);

            // router.push(`${pathname}/${result.chats[result.chats.length - 1].id}`);
        };
        fetchFiles();
    }, [user]);

    useEffect(() => {
        console.log("chats: ", chats);
        if (chats.length > 0) {
            const chatToSelect = chats[chats.length - 1];
            setSelectedChat(chatToSelect);
            setFiles(chatToSelect.knowledge);
            setMessages(chatToSelect.messages);
        }
    }, [chats]);

    useEffect(() => {
        const initSession = async () => {
            if (!sessionId || sessionId === "") {
                const sessionCookies = await fetchCookies();
                const newSessionId = (generateRandomString(10) + "--" + sessionCookies.result).replace(/\//g, "");
                setSessionId(newSessionId);
            }
        };
        initSession();
    }, []);

    return (
        <div className="flex flex-col p-10 min-h-screen xl:max-h-screen bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="flex flex-col xl:flex-row items-stretch justify-between flex-grow mt-16">
                {/* Left Side Div -- file process */}
                <div className="flex-grow p-4 w-full xl:w-[300px] bg-transparent border-2 border-slate-400/20 dark:border-slate-700/30 backdrop-blur-xl shadow-xl dark:shadow-dark-lg text-black dark:text-white rounded-xl">
                    {/* Navigation bar for selecting upload options */}
                    <nav className="flex space-x-2 p-1 rounded-lg shadow-xl dark:shadow-dark-md border border-gray-200 dark:border-gray-700">
                        {files.length === 0 || !showDocument
                            ? OPTIONS.map((o, i) => (
                                  <div key={i} className="flex items-center space-x-2 w-full">
                                      <button
                                          onClick={() => setOption(o)}
                                          className={`flex-grow px-4 py-2 text-sm font-medium shadow-md dark:shadow-dark-sm rounded-md transition-all duration-200
                                            ${
                                                option === o
                                                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                                                    : "bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                                            }`}
                                      >
                                          {o}
                                      </button>
                                      {/* Render the icon only after the last option */}
                                      {i === OPTIONS.length - 1 && (
                                          <div
                                              onClick={() => toggleDocument(true)}
                                              className="flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md shadow-md dark:shadow-dark-sm transition duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                          >
                                              <IoReturnDownForward className="text-slate-500 text-lg hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-300 transition-colors" />
                                          </div>
                                      )}
                                  </div>
                              ))
                            : files.map((file, i) => (
                                  <div key={i} className="flex items-center space-x-2 w-full">
                                      <span
                                          className={cn(
                                              "flex-1 px-4 py-1 w-full flex items-center space-x-2 text-sm font-medium rounded-md transition-all duration-200 truncate cursor-pointer",
                                              selectedFile?.name === file.name
                                                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                                                  : "bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                                          )}
                                      >
                                          <button onClick={() => setSelectedFile(file)} className="w-full">
                                              <p className="truncate max-w-[100px] sm:max-w-[130px] md:max-w-[100px] lg:max-w-[230px] xl:max-w-[70px]">
                                                  {file.name && file.name.split(".")[0]}
                                              </p>
                                          </button>

                                          <button
                                              ref={buttonRef}
                                              onClick={() => setIsFileModalOpen(true)}
                                              className="ml-auto flex items-center justify-center p-2 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-700 rounded-md transition duration-200"
                                          >
                                              <IoEllipsisVertical className="text-gray-100" />
                                          </button>
                                      </span>

                                      {i === files.length - 1 && (
                                          <div
                                              onClick={() => toggleDocument(false)}
                                              className="flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md shadow-md dark:shadow-dark-sm transition duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                          >
                                              <IoReturnDownBack className="text-slate-500 text-lg hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-300 transition-colors" />
                                          </div>
                                      )}
                                  </div>
                              ))}
                    </nav>

                    {(!selectedFile || !showDocument) && option === "Upload A Document" && (
                        <UploadDocument
                            ACCEPTED_EXTENSIONS={ACCEPTED_EXTENSIONS}
                            MAX_SIZE_MB={MAX_SIZE_MB}
                            resetFiles={resetFiles}
                            MAX_FILES={MAX_FILES}
                            sessionId={sessionId}
                        />
                    )}

                    {selectedFile && showDocument && <TextFileViewer file={selectedFile as IFile} />}
                </div>

                {/* Middle Spacer Div (Hidden on smaller screens) */}
                <div className="hidden xl:block flex-grow flex-shrink"></div>

                {/* Chatbot */}
                <Chatbot />
            </div>
            {selectedFile && (
                <FileModal
                    ACCEPTED_EXTENSIONS={ACCEPTED_EXTENSIONS}
                    updateFileProgress={updateFileProgress as (file: IFile | chatbot_File, progress: number) => void}
                    toggleFileModal={setIsFileModalOpen}
                    updateFileStatus={updateFileStatus as (file: IFile | chatbot_File, status: FileStatus) => void}
                    isFileModalOpen={isFileModalOpen}
                    filesToProcess={filesToProcess}
                    updateFileId={updateFileId as (file: IFile | chatbot_File, id: string) => void}
                    MAX_SIZE_MB={MAX_SIZE_MB}
                    removeFile={removeFile as (fileToRemove: IFile | chatbot_File) => void}
                    sessionId={sessionId}
                    MAX_FILES={MAX_FILES}
                    file={selectedFile}
                    setFile={setFile as (file: IFile | chatbot_File) => void}
                    files={files}
                    setId={setId}
                    user={user}
                />
            )}
            <Toaster richColors duration={3500} />
        </div>
    );
}
