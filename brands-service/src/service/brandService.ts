import Brand from "../domain/brands";
import { date, string, z } from "zod";

class BrandService {
    private static BrandCreateSchema = z.object({
        name: string().min(1).max(255),
        description: string().min(1).max(255)
    });

    private static BrandUpdateSchema = z.object({
        name: string().min(1).max(255).optional(),
        description: string().min(1).max(255).optional(),
        website: string().url().max(255).optional(),
        logo: string().url().max(255).optional(),
        updatedAt: date()
    });

    async getAll() {
        return Brand.find();
    }

    async get(id: string) {
        return Brand.findById(id);
    }

    async create(name: string, description: string) {
        try {
            const data = BrandService.BrandCreateSchema.parse({ name, description });
            return Brand.create(data);
        } catch (error) {
            throw error;
        }
    }

    /** Updates an existing brand. */
    async update(
        _id: string,
        name?: string,
        description?: string,
        website?: string,
        logo?: string
    ) {
        try {
            const update = BrandService.BrandUpdateSchema.parse({
                name,
                description,
                website,
                logo,
                updatedAt: new Date()
            });

            return Brand.updateOne({ _id }, { $set: update });
        } catch (error) {
            throw error;
        }
    }

    /** Deletes a brand by ID. */
    async delete(_id: string) {
        await Brand.deleteOne({ _id });
    }
}

const brandService = new BrandService();
export default brandService;