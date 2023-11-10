export const getFullUTCDate = () => {
    const date = new Date()
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getHours()}`
}