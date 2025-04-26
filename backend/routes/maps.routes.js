import express from 'express';
import { getCoordinates, getRouteDetails, getSuggestions } from '../controllers/maps.controller.js';

const router = express.Router();

router.get('/coordinates', getCoordinates);

router.post('/route', getRouteDetails);

router.get('/autocomplete', getSuggestions);

export default router;
