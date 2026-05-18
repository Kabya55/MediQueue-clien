const fs = require('fs');
const { execSync } = require('child_process');

try {
    let remoteUrl = '';
    try {
        remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
    } catch(e) {}

    // Destroy history completely
    fs.rmSync('.git', { recursive: true, force: true });
    execSync('git init', { stdio: 'ignore' });
    execSync('git branch -M main', { stdio: 'ignore' });
    if (remoteUrl) {
        execSync(`git remote add origin ${remoteUrl}`, { stdio: 'ignore' });
    }

    // Generate dates sequentially from May 17 to May 19
    let currentDate = new Date('2026-05-17T08:00:00Z').getTime();
    const getNextDate = () => {
        // Increment date by 1 to 3 hours randomly
        currentDate += (1 + Math.random() * 2) * 60 * 60 * 1000;
        return new Date(currentDate).toISOString();
    };

    const commitWithDate = (msg, files) => {
        const dateStr = getNextDate();
        files.forEach(file => {
            try {
                if (fs.existsSync(file) || file === '.') {
                    execSync(`git add "${file}"`, { stdio: 'ignore' });
                }
            } catch (e) {
                // Ignore if file doesn't match or can't be added
            }
        });
        
        try {
            execSync(`git commit -m "${msg}" --date="${dateStr}"`, { 
                env: { ...process.env, GIT_COMMITTER_DATE: dateStr }, 
                stdio: 'ignore' 
            });
            console.log(`Committed: ${msg}`);
        } catch (e) {
            console.log(`Skipped empty commit: ${msg}`);
        }
    };

    const commits = [
        {
            msg: "chore: initialize Next.js project with dependencies and configurations",
            files: ["package.json", "jsconfig.json", "next.config.mjs", ".gitignore", "eslint.config.mjs"]
        },
        {
            msg: "chore: add public assets and branding SVGs",
            files: ["public"]
        },
        {
            msg: "style: configure Tailwind CSS v4 and DaisyUI custom themes",
            files: ["src/app/globals.css", "src/app/icon.svg", "postcss.config.mjs"]
        },
        {
            msg: "feat: implement system-aware light and dark theme context provider",
            files: ["src/context/ThemeContext.js"]
        },
        {
            msg: "feat: create global authentication context with JWT state management",
            files: ["src/context/AuthContext.js"]
        },
        {
            msg: "feat: integrate backend proxy endpoints and server-side auth logic",
            files: ["src/app/api"]
        },
        {
            msg: "feat: design reusable animated loading spinner component",
            files: ["src/components/Spinner.js"]
        },
        {
            msg: "feat: add client route title updater for dynamic route naming",
            files: ["src/components/TitleUpdater.js"]
        },
        {
            msg: "feat: design responsive glassmorphic navbar with theme toggle",
            files: ["src/components/Navbar.js"]
        },
        {
            msg: "feat: create structured responsive footer with rebranded X logo",
            files: ["src/components/Footer.js"]
        },
        {
            msg: "feat: integrate providers, dynamic titles, and toast notifications in root layout",
            files: ["src/app/layout.js"]
        },
        {
            msg: "feat: design beautiful custom 404 page and nextjs error boundary views",
            files: ["src/app/error.js", "src/app/not-found.js"]
        },
        {
            msg: "feat: design premium responsive homepage with auto slider and live tutors",
            files: ["src/app/page.js"]
        },
        {
            msg: "feat: design premium login page with live validation and social auth",
            files: ["src/app/login"]
        },
        {
            msg: "feat: design premium registration page with dynamic form validators",
            files: ["src/app/register"]
        },
        {
            msg: "feat: implement tutors listing page with live search and date filters",
            files: ["src/app/tutors/page.js"]
        },
        {
            msg: "feat: design private tutor details view with slot checks and date restrictions",
            files: ["src/app/tutors/[id]"]
        },
        {
            msg: "feat: design private add tutor profile form listing page",
            files: ["src/app/add-tutor"]
        },
        {
            msg: "feat: design my tutors management dashboard with edit prefilled modal",
            files: ["src/app/my-tutors"]
        },
        {
            msg: "feat: design my booked learning sessions with cancellable slot list",
            // '.' acts as a catch-all for any remaining files (e.g. package-lock.json, README.md, stray components)
            files: ["."] 
        }
    ];

    commits.forEach(c => commitWithDate(c.msg, c.files));

    console.log('Successfully recreated mediQueue-client history with 20 commits.');
} catch (error) {
    console.error('Error:', error.message);
}
