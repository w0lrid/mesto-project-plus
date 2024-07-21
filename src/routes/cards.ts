import {Router} from "express";
import {createCard, dislikeCard, getCardById, getCards, likeCard} from "../controllers/cards";
import {createCardValidation} from "../validations/validations";

const router = Router();

router.get('/cards', getCards);
router.get('/cards/:id', getCardById);
router.post('/cards', createCardValidation, createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

export default router;