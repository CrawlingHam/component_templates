export default function TwinDivs() {
    return (
        <div className="flex flex-col p-6 min-h-screen bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="flex flex-col xl:flex-row items-stretch justify-between flex-grow mt-16 space-y-4 xl:space-y-0 xl:space-x-60">
                {/* Left Side Div */}
                <div className="flex-grow p-4 w-full xl:w-[100px] bg-transparent border-2 border-slate-400/20 dark:border-slate-700/30 backdrop-blur-xl shadow-xl dark:shadow-dark-lg text-black dark:text-white rounded-xl">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">100K+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Active Users</div>
                </div>

                {/* Right Side Div */}
                <div className="flex-grow p-4 w-full xl:w-[500px] bg-transparent border-2 border-slate-400/20 dark:border-slate-700/30 backdrop-blur-xl shadow-xl dark:shadow-dark-lg text-black dark:text-white rounded-xl">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">100K+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Active Users</div>
                </div>
            </div>
        </div>
    );
}
