/**
 * Sort faculty data by designation hierarchy
 * Order: Professor and Head > Associate Professor > Assistant Professor-I > Assistant Professor-II > Assistant Professor-III
 */
export function sortByDesignation(facultyArray) {
  if (!Array.isArray(facultyArray)) return facultyArray;
  
  // Designation hierarchy (lower number = higher rank)
  const designationOrder = {
    'professor and head': 1,
    'head': 1,
    'hod': 1,
    'associate professor': 2,
    'assistant professor-i': 3,
    'assistant professor-1': 3,
    'assistant professor - i': 3,
    'assistant professor-ii': 4,
    'assistant professor-2': 4,
    'assistant professor - ii': 4,
    'assistant professor-iii': 5,
    'assistant professor-3': 5,
    'assistant professor - iii': 5,
  };
  
  return [...facultyArray].sort((a, b) => {
    const designationA = (a.designation || '').toLowerCase().trim();
    const designationB = (b.designation || '').toLowerCase().trim();
    
    // Get order for each designation
    const orderA = designationOrder[designationA] || 999; // Unknown designations go to end
    const orderB = designationOrder[designationB] || 999;
    
    // First sort by designation hierarchy
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    
    // If same designation, sort by name alphabetically
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

