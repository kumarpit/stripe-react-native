export const checkEnv = () => {
    if (!process.env.PUBLISHABLE_KEY || !process.env.SECRET_KEY || !process.env.MONGODB_URI) {
        console.log("Please set PUBLISHABLE_KEY, SECRET_KEY and/or MONGODB_URI env variables.");
        process.exit(0);
    } 
}