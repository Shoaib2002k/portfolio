/**
 * Navigation Component - Professional Design
 * Dynamic navigation bar with integrated home button
 */

import { isAuthenticated, isAdmin, getUser, logout } from '../utils/auth.js';

class Navigation {
    constructor() {
        this.containerId = 'navigation-container';
    }
    
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        const isAuth = isAuthenticated();
        const user = getUser();
        const isAdminUser = isAdmin();
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Check if not on home page - show back button in nav
        const isHomePage = currentPage === 'index.html';
        
        container.innerHTML = `
            <nav class="navbar">
                <div class="container-custom">
                    <div class="navbar-inner">
                        <!-- Left Section - Brand / Back Button -->
                        <div class="navbar-left">
                            ${!isHomePage ? `
                                <a href="index.html" class="back-home-link">
                                    <i class="fas fa-arrow-left"></i>
                                    <span>Back</span>
                                </a>
                                <div class="navbar-divider"></div>
                            ` : ''}
                            <a href="index.html" class="navbar-brand">
                                <div class="brand-icon">
                                    <i class="fas fa-code"></i>
                                </div>
                                <span class="brand-text">Mohammed Shoaib</span>
                            </a>
                        </div>
                        
                        <!-- Desktop Navigation Links -->
                        <div class="navbar-nav">
                            <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">
                                <i class="fas fa-home"></i>
                                <span>Home</span>
                            </a>
                            <a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">
                                <i class="fas fa-user"></i>
                                <span>About</span>
                            </a>
                            <a href="projects.html" class="nav-link ${currentPage === 'projects.html' ? 'active' : ''}">
                                <i class="fas fa-code"></i>
                                <span>Projects</span>
                            </a>
                            <a href="blog.html" class="nav-link ${currentPage === 'blog.html' ? 'active' : ''}">
                                <i class="fas fa-blog"></i>
                                <span>Blog</span>
                            </a>
                            <a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">
                                <i class="fas fa-envelope"></i>
                                <span>Contact</span>
                            </a>
                            ${isAdminUser ? `
                                <a href="dashboard.html" class="nav-link ${currentPage === 'dashboard.html' ? 'active' : ''}">
                                    <i class="fas fa-tachometer-alt"></i>
                                    <span>Dashboard</span>
                                </a>
                            ` : ''}
                        </div>
                        
                        <!-- Right Section - Auth -->
                        <div class="navbar-right">
                            ${isAuth ? `
                                <div class="user-menu">
                                    <button class="user-menu-btn">
                                        <i class="fas fa-user-circle"></i>
                                        <span>${user?.name?.split(' ')[0] || 'User'}</span>
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                    <div class="user-dropdown">
                                        <button id="logoutBtn" class="dropdown-item">
                                            <i class="fas fa-sign-out-alt"></i>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            ` : `
                                <a href="login.html" class="nav-link">
                                    <i class="fas fa-sign-in-alt"></i>
                                    <span>Login</span>
                                </a>
                                <a href="register.html" class="btn-register">
                                    <i class="fas fa-user-plus"></i>
                                    <span>Register</span>
                                </a>
                            `}
                        </div>
                        
                        <!-- Mobile Menu Toggle -->
                        <button class="mobile-menu-toggle" id="mobileMenuToggle">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile Menu -->
                    <div class="mobile-menu" id="mobileMenu">
                        <a href="index.html" class="mobile-nav-link ${currentPage === 'index.html' ? 'active' : ''}">
                            <i class="fas fa-home"></i> Home
                        </a>
                        <a href="about.html" class="mobile-nav-link ${currentPage === 'about.html' ? 'active' : ''}">
                            <i class="fas fa-user"></i> About
                        </a>
                        <a href="projects.html" class="mobile-nav-link ${currentPage === 'projects.html' ? 'active' : ''}">
                            <i class="fas fa-code"></i> Projects
                        </a>
                        <a href="blog.html" class="mobile-nav-link ${currentPage === 'blog.html' ? 'active' : ''}">
                            <i class="fas fa-blog"></i> Blog
                        </a>
                        <a href="contact.html" class="mobile-nav-link ${currentPage === 'contact.html' ? 'active' : ''}">
                            <i class="fas fa-envelope"></i> Contact
                        </a>
                        ${isAdminUser ? `<a href="dashboard.html" class="mobile-nav-link">Dashboard</a>` : ''}
                        ${isAuth ? `<button id="mobileLogoutBtn" class="mobile-logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>` : `
                            <a href="login.html" class="mobile-nav-link">Login</a>
                            <a href="register.html" class="mobile-nav-link">Register</a>
                        `}
                    </div>
                </div>
            </nav>
        `;
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        const logoutBtn = document.getElementById('logoutBtn');
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
        
        if (logoutBtn) logoutBtn.addEventListener('click', () => logout());
        if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', () => logout());
        
        const menuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nav = new Navigation();
    nav.render();
});