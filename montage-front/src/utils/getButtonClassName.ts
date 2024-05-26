export const getButtonClassName = (currentPath: string, targetPaths: string[]) => {
    return targetPaths.includes(currentPath) ? 'primary' : '';
};