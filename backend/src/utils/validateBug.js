export const validateBug = (bug) => {
  if (!bug.title || !bug.description) {
    throw new Error('Validation failed: Title and description are required');
  }

  const validStatuses = ['Open', 'In-Progress', 'Resolved', 'Closed'];
  const validPriorities = ['Low', 'Medium', 'High'];

  if (bug.status && !validStatuses.includes(bug.status)) {
    throw new Error(`Invalid status. Allowed values: ${validStatuses.join(', ')}`);
  }

  if (bug.priority && !validPriorities.includes(bug.priority)) {
    throw new Error(`Invalid priority. Allowed values: ${validPriorities.join(', ')}`);
  }
};
