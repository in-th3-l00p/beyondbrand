import {ZodIssue} from "zod";
import {useMemo} from "react";

export default function FormError({ errors, name }: {
    errors: ZodIssue[];
    name: string;
}) {
    const error = useMemo(() => {
        const filteredErrors = errors
            .filter(err => err.path.filter(
                path => path === name
            ).length > 0)
        if (filteredErrors.length === 0)
            return null;
        return filteredErrors[0];
    }, [name, errors]);

    if (error === null)
        return <></>
    return (
        <p className={"text-tomato mt-1 mb-4"}>{error.message}</p>
    );
}