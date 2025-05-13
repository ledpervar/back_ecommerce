// Import
import express, { NextFunction } from 'express';

// Middleware class
export class PaginationMiddleware{
    // Constructor
    constructor(){}

    // Middleware function
    paginationMiddleware(req: express.Request, res: express.Response, next: NextFunction): void {
        try{
            // Extract data from URL of Frontend
            const { page, limit } = req.query;

            // Convert: req.query params always are string
            const convertPage = parseInt(page as string, 10); // Decimal base
            const convertLimit = parseInt(limit as string, 10);

            // Validate
            const reasonablePage = isNaN(convertPage) || convertPage <= 0 ? 1 : convertPage;
            const reasonableLimit = isNaN(convertLimit) || convertLimit <= 0 && convertLimit > 150 ? 50 : convertLimit;
            const offset = (reasonablePage - 1) * reasonableLimit;
            
            // Add pagination data to res.locals
            res.locals.pagination = {
                limit: reasonableLimit,
                offset,
                currentPage: reasonablePage
            };

            console.log('PaginationMiddleware: paginación validada correctamente');
            next();

        }catch(error){
            console.error('Error inesperado en PaginationMiddleware:', error);
            res.status(400).send({ message: 'Parámetros de paginación inválidos' });
        }
    }
}