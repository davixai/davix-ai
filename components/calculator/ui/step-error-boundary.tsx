"use client"

// ============================================================================
// Error Boundary pentru conținutul unui pas.
// Dacă un pas crapă, utilizatorul vede o casetă cu mesajul și un buton de
// reluare — niciodată o zonă goală.
// ============================================================================

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
  /** Se schimbă la fiecare pas; resetează automat starea de eroare. */
  resetKey: string
  /** Ieșire de siguranță: întoarce utilizatorul la începutul calculatorului. */
  onReset?: () => void
}

interface State {
  error: Error | null
}

export class StepErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidUpdate(prevProps: Props) {
    // Trecerea la alt pas curăță eroarea anterioară.
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[calculator] pas cu eroare:", error, info.componentStack)
  }

  private retry = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="dvx-fallback" role="alert">
        <div className="dvx-success__ring" style={{ borderColor: "rgba(255,107,107,.4)" }}>
          <AlertTriangle aria-hidden="true" width={24} height={24} color="#ff6b6b" />
        </div>
        <h3 className="dvx-fallback__title">Pasul acesta nu s-a putut afișa</h3>
        <p className="dvx-fallback__text">
          Selecțiile de până acum sunt păstrate. Încearcă din nou — dacă se repetă, o luăm de la
          capăt sau vorbim direct.
          <code className="dvx-fallback__code">{error.message}</code>
        </p>
        <div className="dvx-fallback__actions">
          <button type="button" className="dvx-btn dvx-btn--primary dvx-btn--sm" onClick={this.retry}>
            Încearcă din nou
          </button>
          {this.props.onReset ? (
            <button
              type="button"
              className="dvx-btn dvx-btn--quiet dvx-btn--sm"
              onClick={() => {
                this.setState({ error: null })
                this.props.onReset?.()
              }}
            >
              Ia-o de la capăt
            </button>
          ) : null}
        </div>
      </div>
    )
  }
}
