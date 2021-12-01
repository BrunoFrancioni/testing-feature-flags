import * as express from "express";
import * as bodyParser from "body-parser";
import PostsRoutes from "./routes/PostsRoutes";
import PhotosRoutes from "./routes/PhotosRoutes";

class App {
    public app: express.Application;
    public mongoUrl = String(process.env.MONGO_DB_CONNECTION);

    public postsRoutes: PostsRoutes = new PostsRoutes();
    public photosRoutes: PhotosRoutes = new PhotosRoutes();

    constructor() {
        this.app = express();
        this.config();

        this.postsRoutes.routes(this.app);
        this.photosRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });
    }
}

export default new App().app;