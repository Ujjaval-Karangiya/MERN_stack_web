import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, LogOut, Check, Palette, User } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

// Theme data for previews, ensuring consistency
const themes = [
    { name: 'peach', colors: ['#7f1d1d', '#7f1d1d', '#fecaca'], type: 'light' },
    { name: 'paper', colors: ['#1f2937', '#111827', '#e5e7eb'], type: 'light' },
    { name: 'almond', colors: ['#9a3412', '#1f2937', '#fed7aa'], type: 'light' },
    { name: 'lemon', colors: ['#854d0e', '#1f2937', '#fde68a'], type: 'light' },
    { name: 'mint', colors: ['#065f46', '#064e3b', '#a7f3d0'], type: 'light' },
    { name: 'sky', colors: ['#1e3a8a', '#1e3a8a', '#bfdbfe'], type: 'light' },
    { name: 'slate', colors: ['#334155', '#f1f5f9', '#475569'], type: 'dark' },
    { name: 'crimson', colors: ['#991b1b', '#fee2e2', '#b91c1c'], type: 'dark' },
    { name: 'forest', colors: ['#047857', '#d1fae5', '#065f46'], type: 'dark' },
    { name: 'indigo', colors: ['#4338ca', '#e0e7ff', '#4338ca'], type: 'dark' },
    { name: 'charcoal', colors: ['#374151', '#f9fafb', '#4b5563'], type: 'dark' },
    { name: 'purple', colors: ['#6b21a8', '#f3e8ff', '#6b21a8'], type: 'dark' },
];

const SettingPage = () => {
    const { logout } = useAuthStore();
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "paper");
    const [activeTab, setActiveTab] = useState('appearance');

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const cardStyle = { backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' };
    const primaryButtonStyle = { backgroundColor: 'var(--accent-bg)', color: 'var(--accent-fg)', border: '1px solid var(--border)' };
    const dangerButtonStyle = { backgroundColor: '#ef4444', color: '#ffffff', border: '1px solid #b91c1c' };
    const mutedTextStyle = { color: 'var(--muted-fg, var(--fg))', opacity: 0.8 };

    return (
        <div className='container mx-auto p-4 md:p-8 max-w-6xl mt-16'>
            <header className='mb-10'>
                <h1 className='text-4xl font-bold tracking-tight' style={{ color: 'var(--fg)' }}>
                    Settings
                </h1>
                <p className='mt-2 text-lg' style={mutedTextStyle}>
                    Manage your preferences and account settings.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* --- Sidebar Navigation --- */}
                <aside className="md:col-span-1">
                    <nav className="space-y-2">
                        <SidebarButton
                            icon={<Palette size={20} />}
                            label="Appearance"
                            isActive={activeTab === 'appearance'}
                            onClick={() => setActiveTab('appearance')}
                        />
                        <SidebarButton
                            icon={<User size={20} />}
                            label="Account"
                            isActive={activeTab === 'account'}
                            onClick={() => setActiveTab('account')}
                        />
                    </nav>
                </aside>

                {/* --- Content Area --- */}
                <main className="md:col-span-3">
                    {activeTab === 'appearance' && (
                        <section className='p-6 md:p-8 rounded-lg border' style={cardStyle}>
                            <h2 className='text-2xl font-semibold' style={{ color: 'var(--fg)' }}>Appearance</h2>
                            <p className='mt-1 mb-6' style={mutedTextStyle}>Choose a theme that suits your style.</p>
                            <div>
                                <h3 className='text-lg font-medium mb-4' style={{ color: 'var(--fg)' }}>Light Themes</h3>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                    {themes.filter(t => t.type === 'light').map(t => <ThemePreview key={t.name} theme={t} currentTheme={theme} setTheme={setTheme} />)}
                                </div>
                            </div>
                            <div className='mt-8'>
                                <h3 className='text-lg font-medium mb-4' style={{ color: 'var(--fg)' }}>Dark Themes</h3>
                                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                                    {themes.filter(t => t.type === 'dark').map(t => <ThemePreview key={t.name} theme={t} currentTheme={theme} setTheme={setTheme} />)}
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'account' && (
                        <section className='p-6 md:p-8 rounded-lg border' style={cardStyle}>
                            <h2 className='text-2xl font-semibold' style={{ color: 'var(--fg)' }}>Account Management</h2>
                            <div className='mt-6 space-y-8'>
                                <div>
                                    <h3 className='font-medium' style={{ color: 'var(--fg)' }}>Update Profile</h3>
                                    <p className='text-sm mt-1 mb-3' style={mutedTextStyle}>
                                        Manage your profile information.
                                    </p>
                                    <Link to='/profile' className='btn btn-sm gap-2' style={primaryButtonStyle}>
                                        <Edit3 className='w-4 h-4' />
                                        <span>Go to Profile</span>
                                    </Link>
                                </div>
                                <div className="border-t" style={{ borderColor: 'var(--border)' }} />
                                <div>
                                    <h3 className='font-medium text-red-500'>Logout</h3>
                                    <p className='text-sm mt-1 mb-3' style={mutedTextStyle}>
                                        End your current session securely.
                                    </p>
                                    <a href="/login">
                                        <button onClick={logout} className='btn btn-sm gap-2' style={dangerButtonStyle}>
                                            <LogOut className='w-4 h-4' />
                                            <span>Log Out Now</span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

// Sub-component for Sidebar Buttons
const SidebarButton = ({ icon, label, isActive, onClick }) => {
    const activeStyle = {
        backgroundColor: 'var(--accent-bg)',
        color: 'var(--accent-fg)',
    };
    const inactiveStyle = {
        backgroundColor: 'transparent',
        color: 'var(--fg)',
    };
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors"
            style={isActive ? activeStyle : inactiveStyle}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
};

// Sub-component for rendering each theme preview card
const ThemePreview = ({ theme, currentTheme, setTheme }) => {
    const isActive = currentTheme === theme.name;
    return (
        <div
            className='relative p-2 border rounded-lg cursor-pointer hover:opacity-80 transition-all'
            style={{ borderColor: isActive ? 'var(--accent-bg)' : 'var(--border)' }}
            onClick={() => setTheme(theme.name)}
            title={`Apply ${theme.name} theme`}
        >
            {isActive && (
                <div className='absolute top-2 right-2 flex items-center justify-center size-5 rounded-full' style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent-fg)'}}>
                    <Check size={12} />
                </div>
            )}
            <div className='p-4 rounded' style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className='flex justify-between items-center'>
                    {theme.colors.map((color, index) => (
                        <div key={index} className='w-6 h-6 rounded-full shadow-inner' style={{ backgroundColor: color }} />
                    ))}
                </div>
            </div>
            <p className='text-center mt-2 text-sm capitalize' style={{ color: 'var(--fg)' }}>
                {theme.name}
            </p>
        </div>
    );
};

export default SettingPage;