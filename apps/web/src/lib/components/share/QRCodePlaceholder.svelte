<script lang="ts">
  // Cell size and quiet-zone offset for the 21×21 fake QR grid
  const CELL = 8
  const OFFSET = 4

  // Data + timing modules [col, row], avoiding the three 7×7 finder corners.
  // Finder areas: top-left (cols 0-6, rows 0-6), top-right (cols 14-20, rows 0-6),
  // bottom-left (cols 0-6, rows 14-20).
  const dataModules: [number, number][] = [
    // Top centre strip (cols 8-13, rows 0-6)
    [8, 0], [10, 0], [12, 0],
    [9, 1], [11, 1], [13, 1],
    [8, 2], [10, 2], [12, 2],
    [9, 3], [11, 3], [13, 3],
    [8, 4], [10, 4], [12, 4],
    [9, 5], [11, 5], [13, 5],
    // Timing row (row 6, cols 8-12)
    [8, 6], [10, 6], [12, 6],
    // Timing col (col 6, rows 8-12)
    [6, 8], [6, 10], [6, 12],
    // Centre-left block (cols 7-13, rows 8-20)
    [7, 8],  [9, 8],  [11, 8], [13, 8],
    [8, 9],  [10, 9], [12, 9],
    [7, 10], [9, 10], [11, 10], [13, 10],
    [8, 11], [10, 11], [12, 11],
    [7, 12], [9, 12], [11, 12], [13, 12],
    [8, 13], [10, 13], [12, 13],
    [7, 14], [9, 14], [11, 14], [13, 14],
    [8, 15], [10, 15], [12, 15],
    [7, 16], [9, 16], [11, 16], [13, 16],
    [8, 17], [10, 17], [12, 17],
    [7, 18], [9, 18], [11, 18], [13, 18],
    [8, 19], [10, 19], [12, 19],
    [7, 20], [9, 20], [11, 20], [13, 20],
    // Right block (cols 14-20, rows 8-20)
    [14, 8],  [16, 8],  [18, 8],  [20, 8],
    [15, 9],  [17, 9],  [19, 9],
    [14, 10], [16, 10], [18, 10], [20, 10],
    [15, 11], [17, 11], [19, 11],
    [14, 12], [16, 12], [18, 12], [20, 12],
    [15, 13], [17, 13], [19, 13],
    [14, 14], [16, 14], [18, 14], [20, 14],
    [15, 15], [17, 15], [19, 15],
    [14, 16], [16, 16], [20, 16],
    [15, 17], [19, 17],
    [14, 18], [17, 18], [20, 18],
    [15, 19], [18, 19],
    [14, 20], [16, 20], [19, 20],
  ]

  function px(n: number): number {
    return OFFSET + n * CELL
  }
</script>

<!--
  Decorative fake QR code placeholder.
  Uses an SVG with correct finder patterns + scattered data modules.
  No real QR data — visual only.
-->
<div class="flex flex-col items-center gap-4">
  <div class="bg-white p-3 rounded-2xl shadow-lg">
    <svg
      viewBox="0 0 176 176"
      width="168"
      height="168"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="QR-kode placeholder"
      role="img"
    >
      <!-- White background -->
      <rect width="176" height="176" fill="white" />

      <!-- Top-left finder pattern -->
      <rect x="4"   y="4"   width="56" height="56" fill="#070816" />
      <rect x="12"  y="12"  width="40" height="40" fill="white" />
      <rect x="20"  y="20"  width="24" height="24" fill="#070816" />

      <!-- Top-right finder pattern (col 14 → x = 4 + 14×8 = 116) -->
      <rect x="116" y="4"   width="56" height="56" fill="#070816" />
      <rect x="124" y="12"  width="40" height="40" fill="white" />
      <rect x="132" y="20"  width="24" height="24" fill="#070816" />

      <!-- Bottom-left finder pattern (row 14 → y = 4 + 14×8 = 116) -->
      <rect x="4"   y="116" width="56" height="56" fill="#070816" />
      <rect x="12"  y="124" width="40" height="40" fill="white" />
      <rect x="20"  y="132" width="24" height="24" fill="#070816" />

      <!-- Data modules -->
      {#each dataModules as [col, row]}
        <rect x={px(col)} y={px(row)} width="8" height="8" fill="#070816" />
      {/each}
    </svg>
  </div>

  <div class="text-center">
    <p class="text-sm font-semibold text-text-soft">Scan for å bli med</p>
    <p class="text-xs text-muted mt-0.5">Pek telefonen mot QR-koden</p>
  </div>
</div>
