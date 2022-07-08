export const checkEnv = () => {
    if (!process.env.PUBLISHABLE_KEY || !process.env.SECRET_KEY || !process.env.MONGODB_URI || !process.env.WEBHOOK_SECRET) {
        console.log("Please set PUBLISHABLE_KEY, SECRET_KEY and/or MONGODB_URI env variables.");
        process.exit(0);
    } 
}