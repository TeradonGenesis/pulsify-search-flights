export const calculateNumOfDays = (startDate: Date, endDate: Date): number => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

export const validateStartDateLessThanEndDate = (startDate: Date, endDate: Date): boolean => {
    return startDate.getTime() < endDate.getTime();
}

export const validateStartDateEqualOrMoreThanCurrentDate = (startDate: Date): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    return startDate.getTime() >= currentDate.getTime();
}