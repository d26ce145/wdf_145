/**
 * Practical 6: Rendering External JSON Data using Fetch API, Search, Filter & Pagination
 * Subject: Web Development Frameworks (ITUE203) - Semester 3
 */

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("jsonEventsContainer");
    if (!container) return;

    const searchInput = document.getElementById("jsonSearchInput");
    const categoryFilter = document.getElementById("jsonCategoryFilter");
    const sortSelect = document.getElementById("jsonSortSelect");
    const paginationContainer = document.getElementById("jsonPagination");
    const loadingState = document.getElementById("jsonLoadingState");
    const errorState = document.getElementById("jsonErrorState");
    const resultCount = document.getElementById("jsonResultCount");

    let allEvents = [];
    let filteredEvents = [];
    let currentPage = 1;
    const itemsPerPage = 6;

    // 1. Fetch External JSON Data using Fetch API
    function loadEventsData() {
        if (loadingState) loadingState.style.display = "block";
        if (errorState) errorState.style.display = "none";
        container.innerHTML = "";

        // Fetch from relative path
        fetch("data/events.json")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                allEvents = data;
                populateCategoryFilter(data);
                applyFilterAndRender();
            })
            .catch(function (error) {
                console.error("Error loading JSON:", error);
                if (loadingState) loadingState.style.display = "none";
                if (errorState) {
                    errorState.style.display = "block";
                    errorState.textContent = "Failed to load events data from external JSON. " + error.message;
                }
            });
    }

    // 2. Populate Category Filter Dropdown Dynamically
    function populateCategoryFilter(events) {
        if (!categoryFilter) return;
        const categories = Array.from(new Set(events.map((e) => e.category)));
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(function (cat) {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            categoryFilter.appendChild(opt);
        });
    }

    // 3. Search, Filter & Sort Logic using Array Methods (filter, sort, slice)
    function applyFilterAndRender() {
        if (loadingState) loadingState.style.display = "none";

        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedCategory = categoryFilter ? categoryFilter.value : "";
        const selectedSort = sortSelect ? sortSelect.value : "date-asc";

        // Array filter method for search & category
        filteredEvents = allEvents.filter(function (event) {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.venue.toLowerCase().includes(searchTerm);

            const matchesCategory = selectedCategory === "" || event.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        // Array sort method
        filteredEvents.sort(function (a, b) {
            if (selectedSort === "title-asc") {
                return a.title.localeCompare(b.title);
            } else if (selectedSort === "title-desc") {
                return b.title.localeCompare(a.title);
            } else if (selectedSort === "date-desc") {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });

        if (resultCount) {
            resultCount.textContent = `Showing ${filteredEvents.length} event(s)`;
        }

        currentPage = 1;
        renderPage(currentPage);
        renderPagination();
    }

    // 4. Render Current Page Items
    function renderPage(page) {
        container.innerHTML = "";

        if (filteredEvents.length === 0) {
            container.innerHTML = '<p class="text-muted" style="grid-column: 1 / -1; text-align: center; padding: 30px;">No events match your search criteria.</p>';
            return;
        }

        const startIndex = (page - 1) * itemsPerPage;
        const pageItems = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

        pageItems.forEach(function (event) {
            const card = document.createElement("article");
            card.className = "card";
            card.style.margin = "0";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span class="badge" style="background: rgba(13,110,253,0.12); color: #0d6efd; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                        ${event.category}
                    </span>
                    <small style="color: var(--text-muted); font-size: 12px;">📅 ${event.date}</small>
                </div>
                <h3 style="color: var(--primary-color); font-size: 18px; margin-bottom: 8px;">${event.title}</h3>
                <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px; flex: 1;">${event.description}</p>
                <div style="font-size: 13px; color: var(--text-color); border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: auto;">
                    <strong>📍 Venue:</strong> ${event.venue} <br>
                    <strong>👥 Available Seats:</strong> ${event.seats}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // 5. Render Pagination Controls
    function renderPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
        if (totalPages <= 1) return;

        // Previous button
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "« Prev";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
                renderPagination();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.classList.add("active");
            pageBtn.addEventListener("click", function () {
                currentPage = i;
                renderPage(currentPage);
                renderPagination();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next »";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
                renderPagination();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Event Listeners for search, filter & sort
    if (searchInput) searchInput.addEventListener("input", applyFilterAndRender);
    if (categoryFilter) categoryFilter.addEventListener("change", applyFilterAndRender);
    if (sortSelect) sortSelect.addEventListener("change", applyFilterAndRender);

    // Initial load
    loadEventsData();
});
