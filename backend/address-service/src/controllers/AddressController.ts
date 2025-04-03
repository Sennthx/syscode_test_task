import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";
import logger from "../logger";

export class AddressController {
    private addressService = new AddressService();

    private handleError(error: unknown, defaultMessage: string, logMessage: string) {
        const message = error instanceof Error ? error.message : defaultMessage;
        logger.warn(`${logMessage}: ${message}`);
        return message;
    }

    getAddress = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const address = await this.addressService.find(id);
            logger.info(`Successfully retrieved address for ID: ${id}`);
            res.status(200).json({ id, address });
        } catch (error) {
            const message = this.handleError(error, "Failed to fetch address", `Address fetch error (ID: ${id})`);
            res.status(500).json({ message });
        }
    };
}
