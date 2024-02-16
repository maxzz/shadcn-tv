import plugin from "tailwindcss/plugin";
// import { fontFamily } from "tailwindcss/defaultTheme";

//https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui
//https://github.com/jln13x/ui.jln.dev/blob/main/src/app/feedback-colors-generator-for-shadcn-ui/generator.tsx

export const shadcnFeedbackPlugin = plugin(

    // 1. Add CSS variable definitions to the base layer
    function ({ addBase, theme }) {
        addBase({
            ":root": {
                "--destructive": "0 100% 97%",
                "--destructive-foreground": "360 100% 45%",
                "--destructive-border": "359 100% 94%",

                "--warning": "49 100% 97%",
                "--warning-foreground": "31 92% 45%",
                "--warning-border": "49 91% 91%",

                "--info": "208 100% 97%",
                "--info-foreground": "210 92% 45%",
                "--info-border": "221 91% 91%",

                "--success": "143 85% 96%",
                "--success-foreground": "140 100% 27%",
                "--success-border": "145 92% 91%"
            },
            ".dark": {
                "--destructive": "358 76% 10%",
                "--destructive-foreground": "358 100% 81%",
                "--destructive-border": "357 89% 16%",

                "--warning": "64 100% 6%",
                "--warning-foreground": "46 87% 65%",
                "--warning-border": "60 100% 12%",

                "--info": "215 100% 6%",
                "--info-foreground": "216 87% 65%",
                "--info-border": "223 100% 12%",

                "--success": "150 100% 6%",
                "--success-foreground": "150 86% 65%",
                "--success-border": "147 100% 12%"
            }
        });
    },

    // 2. Extend the Tailwind theme with "themable" utilities
    {
        theme: {
            extend: {
                colors: {
                    destructive: {
                        DEFAULT: "hsl(var(--destructive))",
                        foreground: "hsl(var(--destructive-foreground))",
                        border: "hsl(var(--destructive-border))",
                    },
                    success: {
                        DEFAULT: "hsl(var(--success))",
                        foreground: "hsl(var(--success-foreground))",
                        border: "hsl(var(--success-border))",
                    },
                    warning: {
                        DEFAULT: "hsl(var(--warning))",
                        foreground: "hsl(var(--warning-foreground))",
                        border: "hsl(var(--warning-border))",
                    },
                    info: {
                        DEFAULT: "hsl(var(--info))",
                        foreground: "hsl(var(--info-foreground))",
                        border: "hsl(var(--info-border))",
                    },
                },
            }
        }
    }
);

export default shadcnFeedbackPlugin;
