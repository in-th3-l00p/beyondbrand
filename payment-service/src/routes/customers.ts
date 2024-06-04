import {Router} from "express"

const router = Router();

router.get("/", (req, res) => {
    // jwt.decode(req.cookies["next-auth.session-token"], {
    //
    // })
    req.cookies["next-auth.session-token"];
    res.send("test");
});

export default router;