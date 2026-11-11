<script lang="ts">
  
  

  export let downloadText = "Karta katalogowa (PDF)";
  export let downloadHref = "#";
  export let contactText = "Zapytaj o wycenę i konfigurację";
  export let contactHref = "/kontakt";
</script>

<div class="machine-actions-bar">
  <div class="actions-inner">
    <a href={downloadHref} target="_blank" rel="noopener noreferrer" class="action-btn btn-download">
      <span class="btn-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </span>
      <span class="btn-text">{downloadText}</span>
    </a>

    <a href={contactHref} class="action-btn btn-contact">
      <span class="btn-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </span>
      <span class="btn-text">{contactText}</span>
    </a>
  </div>
</div>

<style lang="scss">
  .machine-actions-bar {
    width: 100%;
    margin-top: 3.5rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);

    .actions-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.9rem 1.8rem;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.25s ease;
      letter-spacing: 0.02em;

      .btn-icon {
        display: flex;
        align-items: center;
      }
    }

    .btn-download {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #e5e7eb;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.4);
        color: #ffffff;
        transform: translateY(-2px);
      }
    }

    .btn-contact {
      background: #c5d418;
      border: 1px solid #c5d418;
      color: #1a1a1a;

      &:hover {
        background: #d4e329;
        border-color: #d4e329;
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(197, 212, 24, 0.3);
      }
    }

    @media (max-width: 640px) {
      margin-top: 2rem;
      padding-top: 1.5rem;

      .actions-inner {
        flex-direction: column;
        width: 100%;
      }

      .action-btn {
        width: 100%;
        padding: 0.85rem 1.25rem;
        font-size: 0.9rem;
      }
    }
  }
</style>
