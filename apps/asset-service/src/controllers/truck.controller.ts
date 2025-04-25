import { Request, Response, Router } from 'express';
import { TruckService } from '../services/truck.service';
import { Truck } from 'shared-types'; // Import the shared Truck type

const router = Router();
const truckService = new TruckService();

// GET /trucks - Get all trucks
router.get('/', async (req: Request, res: Response) => {
    try {
        const trucks = await truckService.findAllTrucks();
        res.json(trucks);
    } catch (error) {
        console.error('Error fetching trucks:', error);
        res.status(500).send('Error fetching trucks');
    }
});

// GET /trucks/:id - Get a truck by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const truck = await truckService.findTruckById(req.params.id);
        if (truck) {
            res.json(truck);
        } else {
            res.status(404).send('Truck not found');
        }
    } catch (error) {
        console.error(`Error fetching truck with ID ${req.params.id}:`, error);
        res.status(500).send('Error fetching truck');
    }
});

// POST /trucks - Create a new truck
router.post('/', async (req: Request, res: Response) => {
    try {
        const truckData: Partial<Truck> = req.body;
        const newTruck = await truckService.createTruck(truckData);
        res.status(201).json(newTruck);
    } catch (error) {
        console.error('Error creating truck:', error);
        res.status(500).send('Error creating truck');
    }
});

// PUT /trucks/:id - Update a truck by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const truckData: Partial<Truck> = req.body;
        const updatedTruck = await truckService.updateTruck(req.params.id, truckData);
        if (updatedTruck) {
            res.json(updatedTruck);
        } else {
            res.status(404).send('Truck not found');
        }
    } catch (error) {
        console.error(`Error updating truck with ID ${req.params.id}:`, error);
        res.status(500).send('Error updating truck');
    }
});

// DELETE /trucks/:id - Delete a truck by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await truckService.deleteTruck(req.params.id);
        if (deleted) {
            res.status(204).send(); // No content on successful deletion
        } else {
            res.status(404).send('Truck not found');
        }
    } catch (error) {
        console.error(`Error deleting truck with ID ${req.params.id}:`, error);
        res.status(500).send('Error deleting truck');
    }
});

export default router; // Export the router