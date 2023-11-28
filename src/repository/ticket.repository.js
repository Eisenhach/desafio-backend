import { ticketModel } from "../dao/models/ticket.model.js";

export class TicketRepository {
  create = async (newCode, newAmount, newPurchaser) => {
    try {
      const newTicket = await ticketModel.create({
        code: newCode,
        amount: newAmount,
        purchaser: newPurchaser,
      });
      return newTicket;
    } catch (error) {
      logger.error(error);
    }
  };
}
