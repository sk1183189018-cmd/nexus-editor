import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Files,
  Search,
  GitBranch,
  Play,
  Puzzle,
  Settings,
  Terminal,
  Bot,
  FolderOpen,
  Plus,
  X
} from "lucide-react";

type FileTab = {
  id: number;
  name: string;
  language: string;
  content: string;
};

const initialFiles: FileTab[] = [
  {
    id: 1,
    name: "main.py",
    language: "python",
    content:
`def main():
    print("Hello from NEXUS EDITOR")


if __name__ == "__main__":
    main()
`
  },
  {
    id: 2,
    name: "README.md",
    language: "markdown",
    content:
`# NEXUS EDITOR

Welcome to NEXUS EDITOR.

Code. Create. Beyond.
`
  }
];

export default function App() {
  const [activeSide, setActiveSide] = useState("files");
  const [tabs, setTabs] = useState<FileTab[]>(initialFiles);
  const [activeTab, setActiveTab] = useState(1);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(true);

  const currentFile =
    tabs.find((file) => file.id === activeTab) ?? tabs[0];

  function updateCode(value: string | undefined) {
    if (value === undefined) return;

    setTabs((oldTabs) =>
      oldTabs.map((file) =>
        file.id === activeTab
          ? { ...file, content: value }
          : file
      )
    );
  }

  function closeTab(id: number) {
    const remaining = tabs.filter((tab) => tab.id !== id);

    if (remaining.length === 0) {
      setTabs([]);
      return;
    }

    setTabs(remaining);

    if (id === activeTab) {
      setActiveTab(remaining[remaining.length - 1].id);
    }
  }

  return (
    <div className="nexus-app">

      {/* TOP BAR */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">N</div>
          <span>NEXUS</span>
          <small>EDITOR</small>
        </div>

        <div className="command-search">
          <Search size={16} />
          <span>Search files, commands, symbols...</span>
          <kbd>Ctrl K</kbd>
        </div>

        <div className="top-actions">
          <button
            title="NEXUS AI"
            onClick={() => setAiOpen(!aiOpen)}
          >
            <Bot size={19} />
          </button>

          <button title="Settings">
            <Settings size={19} />
          </button>
        </div>
      </header>

      <div className="workspace">

        {/* ACTIVITY BAR */}
        <aside className="activity-bar">
          <button
            className={activeSide === "files" ? "active" : ""}
            onClick={() => setActiveSide("files")}
            title="Explorer"
          >
            <Files />
          </button>

          <button
            className={activeSide === "search" ? "active" : ""}
            onClick={() => setActiveSide("search")}
            title="Search"
          >
            <Search />
          </button>

          <button
            className={activeSide === "git" ? "active" : ""}
            onClick={() => setActiveSide("git")}
            title="Source Control"
          >
            <GitBranch />
          </button>

          <button
            className={activeSide === "run" ? "active" : ""}
            onClick={() => setActiveSide("run")}
            title="Run"
          >
            <Play />
          </button>

          <button
            className={activeSide === "extensions" ? "active" : ""}
            onClick={() => setActiveSide("extensions")}
            title="Extensions"
          >
            <Puzzle />
          </button>

          <div className="activity-bottom">
            <button title="Settings">
              <Settings />
            </button>
          </div>
        </aside>

        {/* EXPLORER */}
        <aside className="sidebar">

          <div className="sidebar-title">
            <span>
              {activeSide === "files" && "EXPLORER"}
              {activeSide === "search" && "SEARCH"}
              {activeSide === "git" && "SOURCE CONTROL"}
              {activeSide === "run" && "RUN & DEBUG"}
              {activeSide === "extensions" && "EXTENSIONS"}
            </span>

            <button title="New">
              <Plus size={16} />
            </button>
          </div>

          {activeSide === "files" && (
            <>
              <div className="workspace-title">
                <FolderOpen size={15} />
                <span>NEXUS PROJECT</span>
              </div>

              <div className="file-tree">

                <div className="folder">
                  📁 src
                </div>

                <div
                  className="file selected"
                  onClick={() => setActiveTab(1)}
                >
                  🐍 main.py
                </div>

                <div className="file">
                  📄 requirements.txt
                </div>

                <div className="folder">
                  📁 tests
                </div>

                <div
                  className="file"
                  onClick={() => setActiveTab(2)}
                >
                  📝 README.md
                </div>

              </div>
            </>
          )}

          {activeSide === "search" && (
            <div className="empty-panel">
              <Search size={30} />
              <p>Search across your project</p>
            </div>
          )}

          {activeSide === "git" && (
            <div className="empty-panel">
              <GitBranch size={30} />
              <p>Git integration coming next</p>
            </div>
          )}

          {activeSide === "run" && (
            <div className="empty-panel">
              <Play size={30} />
              <p>Run & Debug system</p>
            </div>
          )}

          {activeSide === "extensions" && (
            <div className="empty-panel">
              <Puzzle size={30} />
              <p>NEXUS Extension Marketplace</p>
            </div>
          )}

        </aside>

        {/* MAIN */}
        <main className="main-area">

          {/* TABS */}
          <div className="tabs">

            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab ${
                  activeTab === tab.id ? "active-tab" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.name}</span>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            ))}

          </div>

          {/* BREADCRUMB */}
          <div className="breadcrumb">
            <span>NEXUS PROJECT</span>
            <span>›</span>
            <span>src</span>
            <span>›</span>
            <strong>{currentFile?.name ?? "No file"}</strong>
          </div>

          {/* EDITOR */}
          <div className="editor-container">

            {currentFile ? (
              <Editor
                height="100%"
                theme="vs-dark"
                language={currentFile.language}
                value={currentFile.content}
                onChange={updateCode}
                options={{
                  fontSize: 14,
                  minimap: {
                    enabled: true
                  },
                  automaticLayout: true,
                  padding: {
                    top: 12
                  },
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  scrollBeyondLastLine: false
                }}
              />
            ) : (
              <div className="welcome">
                <div className="welcome-logo">N</div>
                <h1>NEXUS EDITOR</h1>
                <p>Code · Create · Beyond</p>
              </div>
            )}

          </div>

          {/* TERMINAL */}
          {terminalOpen && (
            <section className="terminal">

              <div className="terminal-header">
                <div className="terminal-tabs">
                  <span className="terminal-active">
                    TERMINAL
                  </span>
                  <span>PROBLEMS</span>
                  <span>OUTPUT</span>
                  <span>DEBUG CONSOLE</span>
                </div>

                <button
                  onClick={() => setTerminalOpen(false)}
                  title="Close Terminal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="terminal-body">
                <div>
                  <span className="terminal-prompt">
                    nexus@project
                  </span>
                  <span> $ </span>
                  <span>ready</span>
                </div>

                <div className="terminal-cursor">
                  _
                </div>
              </div>

            </section>
          )}

          {!terminalOpen && (
            <button
              className="terminal-open"
              onClick={() => setTerminalOpen(true)}
            >
              <Terminal size={15} />
              TERMINAL
            </button>
          )}

          {/* STATUS BAR */}
          <footer className="statusbar">
            <div>
              <span>●</span>
              NEXUS
            </div>

            <div className="status-right">
              <span>Python</span>
              <span>UTF-8</span>
              <span>Ln 1, Col 1</span>
              <span>Git: main</span>
            </div>
          </footer>

        </main>

        {/* AI PANEL */}
        {aiOpen && (
          <aside className="ai-panel">

            <div className="ai-header">
              <div>
                <Bot size={18} />
                <strong>NEXUS AI</strong>
              </div>

              <button onClick={() => setAiOpen(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="ai-content">

              <div className="ai-welcome">
                <div className="ai-icon">
                  ✦
                </div>

                <h3>How can I help?</h3>

                <p>
                  Ask NEXUS to explain, create, fix,
                  refactor or analyze your code.
                </p>
              </div>

              <button className="ai-action">
                Explain this code
              </button>

              <button className="ai-action">
                Find and fix errors
              </button>

              <button className="ai-action">
                Generate tests
              </button>

              <button className="ai-action">
                Improve this code
              </button>

            </div>

            <div className="ai-input">
              <input
                placeholder="Ask NEXUS anything..."
              />

              <button>
                <Bot size={17} />
              </button>
            </div>

          </aside>
        )}

      </div>
    </div>
  );
        }
