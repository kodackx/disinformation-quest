export interface ExpertAudio {
    briefing: string;
    voice: string;
}

export interface AudioConfig {
    briefing: string;
    voice: string;
}

export interface MonthConfig {
    key: string;
    // This key can be used with your localization i18n system.
    translationKey: string;
    audio?: AudioConfig;
}

// Using a sparse array where index matches stage number
// Index 0 is empty, stages start at 1
export const MONTHS_CONFIG: (MonthConfig | undefined)[] = [];

// January is stage 1
MONTHS_CONFIG[1] = {
    key: "january",
    translationKey: "months.january",
    audio: {
        briefing: "january-en.mp3",
        voice: "Dr. Chen"
    }
};

// March is stage 2
MONTHS_CONFIG[2] = {
    key: "march",
    translationKey: "months.march",
    audio: {
        briefing: "march-en.mp3",
        voice: "Professor Morrison"
    }
};

// May is stage 3
MONTHS_CONFIG[3] = {
    key: "may",
    translationKey: "months.may",
    audio: {
        briefing: "may-en.mp3",
        voice: "Dr. Chen"
    }
};

// Alert is stage 4
MONTHS_CONFIG[4] = {
    key: "alert",
    translationKey: "months.alert",
    audio: {
        briefing: "alert-en.mp3",
        voice: "System Alert"
    }
};

// July is stage 5
MONTHS_CONFIG[5] = {
    key: "july",
    translationKey: "months.july",
    audio: {
        briefing: "july-en.mp3",
        voice: "Dr. Webb"
    }
};

// September is stage 6
MONTHS_CONFIG[6] = {
    key: "september",
    translationKey: "months.september"
};

// November is stage 7
MONTHS_CONFIG[7] = {
    key: "november",
    translationKey: "months.november"
};

// December is stage 8
MONTHS_CONFIG[8] = {
    key: "december",
    translationKey: "months.december"
};

// Exposé is stage 9
MONTHS_CONFIG[9] = {
    key: "exposé",
    translationKey: "months.exposé"
};

// Utility function to get month config - now much simpler!
export function getMonthConfig(stage: string | number): MonthConfig | undefined {
    const stageNum = typeof stage === 'string' ? parseInt(stage) : stage;
    return MONTHS_CONFIG[stageNum];
}