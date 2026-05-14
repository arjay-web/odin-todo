export function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects))
}

export function loadProjects() {
    const data = localStorage.getItem('projects')
    if (!data) return [];
    return JSON.parse(data)
}

