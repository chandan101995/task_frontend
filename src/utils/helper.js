export const validateDOB = (dob) => {
    if (!dob) return false;

    const today = new Date();
    const birthDate = new Date(dob);
    const minAge = 14;
    const maxAge = 99;
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (age < minAge || age >= maxAge) {
        return false;
    }
    if (age === minAge && (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))) {
        return false;
    }
    return true;
};