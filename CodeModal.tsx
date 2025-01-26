export default function CodeModal({ handleCloseModal, handleVerify, email, setCode, code }: ICodeModal) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-sm w-full">
                <button
                    onClick={handleCloseModal}
                    className="ml-80 text-gray-500 dark:text-gray-400 text-2xl hover:text-teal-300 dark:hover:text-teal-500 transform hover:scale-125 transition-transform duration-100"
                >
                    &times;
                </button>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">Enter a 6-Digit Code to verify your Email</h3>
                <h6 className="mb-3 text-gray-700 dark:text-gray-300"> You're almost there! We've sent a 6 digit code to {email}.</h6>
                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        className="w-full h-12 p-2 mb-4 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter Code"
                    />
                    <button
                        type="submit"
                        className={`w-full h-12 mt-4 bg-gradient-to-r from-gray-300 to-teal-400 dark:from-gray-700 dark:to-teal-600 text-white border rounded-lg cursor-pointer ${
                            code.length !== 6
                                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                                : "hover:from-orange-50 hover:to-pink-500 dark:hover:from-orange-200 dark:hover:to-pink-600"
                        }`}
                        disabled={code.length !== 6}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
}

type ICodeModal = {
    setCode: (value: React.SetStateAction<string>) => void;
    handleVerify: (e: any) => void;
    handleCloseModal: () => void;
    email: string;
    code: string;
};

import { app } from "../admin-config";

export default async function createVerificationLink(email: string) {
    return await app.auth().generateEmailVerificationLink(email);
}


