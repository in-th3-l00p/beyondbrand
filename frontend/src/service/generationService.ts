const API = process.env.NEXT_PUBLIC_API;

class GenerationService {
    async name(description: string) {
        if (description.length < 1 || description.length > 500)
            throw new Error("Description must be between 1 and 500 characters.");

        const resp = await fetch(`${API}/api/generation/name`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({description})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async namePrompted(prompt: string) {
        if (prompt.length < 1 || prompt.length > 500)
            throw new Error("Prompt must be between 1 and 500 characters.");

        const resp = await fetch(`${API}/api/generation/name/prompted`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({prompt})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async description(name: string, description?: string) {
        if (name.length < 1 || name.length > 255)
            throw new Error("Name must be between 1 and 255 characters.");
        if (description && (description.length < 1 || description.length > 500))
            throw new Error("Description must be between 1 and 500 characters.");

        const resp = await fetch(`${API}/api/generation/description`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, description})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async descriptionPrompted(prompt: string, name?: string) {
        if (name && (name.length < 1 || name.length > 255))
            throw new Error("Name must be between 1 and 255 characters.");
        if (prompt.length < 1 || prompt.length > 500)
            throw new Error("Prompt must be between 1 and 500 characters.");

        const resp = await fetch(`${API}/api/generation/description/prompted`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, prompt})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async colors(
        colors: number,
        name?: string,
        description?: string
    ) {

        if (name && (name.length < 1 || name.length > 255))
            throw new Error("Name must be between 1 and 255 characters.");
        if (description && (description.length < 1 || description.length > 500))
            throw new Error("Description must be between 1 and 500 characters.");

        const resp = await fetch(`${API}/api/generation/colors?colors=${colors}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, description})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async colorsPrompted(
        colors: number,
        prompt: string,
        name?: string,
        description?: string
    ) {
        if (name && (name.length < 1 || name.length > 255))
            throw new Error("Name must be between 1 and 255 characters.");
        if (description && (description.length < 1 || description.length > 500))
            throw new Error("Description must be between 1 and 500 characters.");
        if (prompt.length < 1 || prompt.length > 500)
            throw new Error("Prompt must be between 1 and 500 characters.");

        const resp = await fetch(`${API}/api/generation/colors/prompted?colors=${colors}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, description, prompt})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async logo(
        name: string,
        description: string,
        colors: string[]
    ) {
        if (name.length < 1 || name.length > 255)
            throw new Error("Name must be between 1 and 255 characters.");
        if (description.length < 1 || description.length > 500)
            throw new Error("Description must be between 1 and 500 characters.");
        if (colors.length < 1 || colors.length > 6)
            throw new Error("Colors must be between 1 and 6.");

        const resp = await fetch(`${API}/api/generation/logo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, description, colors})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async logoPrompted(
        prompt: string,
        colors: string[]
    ) {
        if (prompt.length < 1 || prompt.length > 500)
            throw new Error("Prompt must be between 1 and 500 characters.");
        if (colors.length < 1 || colors.length > 6)
            throw new Error("Colors must be between 1 and 6.");

        const resp = await fetch(`${API}/api/generation/logo/prompted`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({prompt, colors})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }

    async businessPlan(
        id: string,
        prompt?: string
    ) {
        if (id.length !== 24)
            throw new Error("Invalid ID.");

        const resp = await fetch(`${API}/api/generation/business-plan/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({prompt})
        });
        if (!resp.ok)
            throw new Error(await resp.json());

        return resp.json();
    }
}

const generationService = new GenerationService();
export default generationService;
