import { Request, Response, Router } from 'express';
import { DriverService } from '../services/driver.service';
import { Driver } from 'shared-types'; // Import the shared Driver type

const router = Router();
const driverService = new DriverService();

// GET /drivers - Get all drivers
router.get('/', async (req: Request, res: Response) => {
    try {
        const drivers = await driverService.findAllDrivers();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).send('Error fetching drivers');
    }
});

// GET /drivers/:id - Get a driver by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const driver = await driverService.findDriverById(req.params.id);
        if (driver) {
            res.json(driver);
        } else {
            res.status(404).send('Driver not found');
        }
    } catch (error) {
        console.error(`Error fetching driver with ID ${req.params.id}:`, error);
        res.status(500).send('Error fetching driver');
    }
});

// POST /drivers - Create a new driver
router.post('/', async (req: Request, res: Response) => {
    try {
        const driverData: Partial<Driver> = req.body;
        const newDriver = await driverService.createDriver(driverData);
        res.status(201).json(newDriver);
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(500).send('Error creating driver');
    }
});

// PUT /drivers/:id - Update a driver by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const driverData: Partial<Driver> = req.body;
        const updatedDriver = await driverService.updateDriver(req.params.id, driverData);
        if (updatedDriver) {
            res.json(updatedDriver);
        } else {
            res.status(404).send('Driver not found');
        }
    } catch (error) {
        console.error(`Error updating driver with ID ${req.params.id}:`, error);
        res.status(500).send('Error updating driver');
    }
});

// DELETE /drivers/:id - Delete a driver by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await driverService.deleteDriver(req.params.id);
        if (deleted) {
            res.status(204).send(); // No content on successful deletion
        } else {
            res.status(404).send('Driver not found');
        }
    } catch (error) {
        console.error(`Error deleting driver with ID ${req.params.id}:`, error);
        res.status(500).send('Error deleting driver');
    }
});

export default router; // Export the router