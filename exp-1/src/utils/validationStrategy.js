export const platformLimits = {
    twitter: 50,
    linkedin: 3000,
    instagram: 2200,
};

export const validatePost = (content, platform) => {
    if (!content.trim()) {
        return {
            isValid: false,
            error: "Post cannot be empty.",
            limit: platformLimits[platform],
        };
    }

    const limit = platformLimits[platform];

    if (content.length > limit) {
        return {
            isValid: false,
            error: `Maximum ${limit} characters allowed.`,
            limit,
        };
    }

    return {
        isValid: true,
        error: "",
        limit,
    };
};