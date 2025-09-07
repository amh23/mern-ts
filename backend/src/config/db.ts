import mongoose, { Mongoose} from "mongoose";

/**
 * Connect to MongoDB using Mongoose and Singleton pattern.
 * The connection string is taken from the MONGODB_URI environment variable.
 * If not provided, it defaults to a local MongoDB instance.
 */
class Database {
    // Singleton instance
    private static instance: Database;

    // Mongoose connection instance which will store actual connection instance from mongoose
    private connection: Mongoose | null = null;

    // Private constructor to prevent direct instantiation
    private constructor() {}  

    /**
   * Get the instance of the Database class (Singleton pattern).
   * Ensures that the database is only connected once.
   */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance =  new Database();
        }
        return Database.instance;
    }   
    /**
   * Connect to the MongoDB database.
   * Uses the MONGODB_URI environment variable or defaults to a local MongoDB instance.
   * Throws an error if the connection fails.
   * */
  public async connect(uri: string): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        console.log("✅ MongoDB already connected");
        return; // Already connected
    }
     try{
        // Attempt to connect to the database
       await mongoose.connect(uri);
        console.log("✅ MongoDB successfully connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed", error);
        throw error;    
    }

}
    /**
     * Disconnect from the MongoDB database.
     * Closes the connection if it exists.
     */
    public async disconnect(): Promise<void> {
        if(mongoose.connection.readyState === 0) {
            console.log("❌ No MongoDB connection to close");
            return; // No connection to close
        }
        try {
            await mongoose.disconnect();
            console.log("✅ MongoDB disconnected");
        } catch (error) {
            console.error("❌ Error disconnecting MongoDB", error);
            throw error;
        }
    }

}
export const dbInstance = Database.getInstance();


