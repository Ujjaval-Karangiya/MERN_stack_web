const AuthCirclePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
            <div className="max-w-md text-center">
                {/* Decorative circles */}
                <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute w-40 h-40 rounded-full bg-primary/10 animate-ping"></div>
                    <div className="absolute w-28 h-28 rounded-full bg-primary/20 animate-pulse"></div>
                    <div className="absolute w-16 h-16 rounded-full bg-primary"></div>
                </div>

                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthCirclePattern;
