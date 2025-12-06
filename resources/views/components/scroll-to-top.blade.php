<script>
    /**
     * ScrollToTop Component
     * Equivalent to the React ScrollToTop component.
     * In a standard Laravel Blade app (MPA), the browser naturally scrolls to top on page reload.
     * This script ensures it happens explicitly, which can be useful if there are scroll restoration behaviors
     * or if using tools like Turbo/Livewire in the future.
     */
    document.addEventListener('DOMContentLoaded', function() {
        window.scrollTo(0, 0);
    });
</script>
