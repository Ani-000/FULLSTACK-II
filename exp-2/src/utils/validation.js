export const PLATFORM_LIMITS = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
};

export function validatePost(content, platform) {
    if (!content.trim()) {
        return {
            isValid: false,
            error: "Post cannot be empty.",
        };
    }

    const limit = PLATFORM_LIMITS[platform];

    if (content.length > limit) {
        return {
            isValid: false,
            error: `Maximum ${limit} characters allowed.`,
        };
    }

    return {
        isValid: true,
        error: "",
    };
}