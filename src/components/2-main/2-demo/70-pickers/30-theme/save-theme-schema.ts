// 1
// import { NonEmptyString } from "@jlns/zod";
// import { z } from "zod";

// export const SaveThemeSchema = z.object({
//     name: NonEmptyString().max(50, {
//         message: "Too long",
//     }),
//     isPublic: z.boolean(),
// });



// 2
// import { z } from "zod";

// export const NonEmptyString = z.string().min(1);

// export const SaveThemeSchema = z.object({
//     name: NonEmptyString.max(50, {
//         message: "Too long",
//     }),
//     isPublic: z.boolean(),
// });



// 3
import { z } from "zod";

export const nonEmptyString = (message = 'String value is required') => {
    return z.string().min(1, { message });
};

export const SaveThemeSchema = z.object({
    name: nonEmptyString('Too short').max(50, {
        message: "Too long",
    }),
    isPublic: z.boolean(),
});
