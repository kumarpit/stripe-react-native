export const checkEnv = () => {
    if (!process.env.PUBLISHABLE_KEY || !process.env.SECRET_KEY) {
        console.log("Please set PUBLISHABLE_KEY and SECRET_KEY env variables.");
        process.exit(0);
    } 
}