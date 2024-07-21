import {Router} from "express";
import {createUser, getCurrentUser, getUserById, getUsers, updateAvatar, updateUser} from "../controllers/users";

const router = Router();

router.get("/me", getCurrentUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('users/me/avatar', updateAvatar);

export default router;