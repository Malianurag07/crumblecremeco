interface Props {
  className?: string
  /** accessible description; omit when purely decorative */
  label?: string
}

/**
 * Crumbie — a soft little cookie who is crumbling apart and, to her mild alarm
 * and great delight, overflowing with cream. Worried brows, happy mouth.
 */
export default function Crumbie({ className, label }: Props) {
  const ink = '#382521'
  const dough = '#F5E3BD'
  const doughShade = '#E7C98F'
  const cream = '#FFFCF4'
  return (
    <svg
      viewBox="0 0 240 244"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {label ? <title>{label}</title> : null}
      {/* ground shadow */}
      <ellipse cx="120" cy="235" rx="74" ry="6.5" fill={ink} opacity=".13" />

      {/* chunk breaking off, top right */}
      <g transform="translate(192 20) rotate(28)">
        <path d="M0 8L9-1 21 3 28 12 20 23 7 20-2 15Z" fill={dough} stroke={ink} strokeWidth="4" />
        <path d="M12 9l6 1-1 6-6-1z" fill="#6A4538" stroke="#6A4538" strokeWidth="2" />
      </g>
      {/* flying crumbs */}
      <circle cx="222" cy="66" r="3.4" fill={ink} />
      <circle cx="212" cy="86" r="2.4" fill={ink} />
      <circle cx="170" cy="18" r="2.8" fill={doughShade} stroke={ink} strokeWidth="1.8" />
      <circle cx="30" cy="196" r="2.6" fill={ink} />
      <circle cx="16" cy="170" r="2" fill={ink} />

      {/* body */}
      <path
        d="M118 38C164 34 210 66 216 116 222 166 190 212 136 218 90 224 38 202 28 150 20 104 54 42 118 38Z"
        fill={dough}
        stroke={ink}
        strokeWidth="5"
      />
      {/* toasted edge + soft highlight */}
      <path
        d="M205 150C200 186 176 206 138 208"
        stroke={doughShade}
        strokeWidth="9"
        opacity=".7"
      />
      <path d="M58 76C70 58 90 48 112 46" stroke="#FFF6DC" strokeWidth="6" opacity=".9" />

      {/* chocolate chunks */}
      <g fill="#6A4538" stroke={ink} strokeWidth="3">
        <path d="M64 108l12-6 6 11-11 7z" />
        <path d="M168 62l11 3-2 11-11-3z" />
        <path d="M184 128l12 2-1 12-12-3z" />
        <path d="M54 164l12-3 4 11-11 5z" />
        <path d="M156 196l10-4 5 9-10 5z" />
      </g>
      {/* crumb speckle */}
      <g fill={ink} opacity=".55">
        <circle cx="96" cy="68" r="2" />
        <circle cx="132" cy="58" r="1.8" />
        <circle cx="46" cy="136" r="1.8" />
        <circle cx="200" cy="100" r="1.8" />
        <circle cx="76" cy="196" r="1.8" />
      </g>

      {/* cracks */}
      <path d="M166 52l-9 14 11 8-8 14" stroke={ink} strokeWidth="4" />
      <path d="M40 118l16 6-8 12 14 6" stroke={ink} strokeWidth="3.5" />

      {/* cherry on top — the one touch of red */}
      <g>
        <path d="M92 36C94 22 104 12 118 10" stroke={ink} strokeWidth="3.4" />
        <circle cx="90" cy="46" r="13" fill="#A51F2B" stroke={ink} strokeWidth="4" />
        <path d="M83 42c1-3 4-5 7-5" stroke="#FFD9D2" strokeWidth="3" />
      </g>

      {/* worried brows */}
      <path d="M72 100Q88 92 104 84" stroke={ink} strokeWidth="5.5" />
      <path d="M168 100Q152 92 136 84" stroke={ink} strokeWidth="5.5" />
      {/* eyes */}
      <ellipse cx="92" cy="114" rx="9.5" ry="12.5" fill={ink} />
      <ellipse cx="148" cy="114" rx="9.5" ry="12.5" fill={ink} />
      <circle cx="95" cy="109" r="3.6" fill="#fff" />
      <circle cx="151" cy="109" r="3.6" fill="#fff" />
      <circle cx="90" cy="119" r="1.6" fill="#fff" />
      <circle cx="146" cy="119" r="1.6" fill="#fff" />
      {/* cheeks */}
      <ellipse cx="68" cy="140" rx="12" ry="8" fill="#A51F2B" opacity=".2" />
      <ellipse cx="172" cy="140" rx="12" ry="8" fill="#A51F2B" opacity=".2" />

      {/* sweat drop */}
      <path d="M184 92c-6 10-8 15-3 19 5 3 11-1 9-8-1-4-3-7-6-11z" fill="#fff" stroke={ink} strokeWidth="3.2" />

      {/* mouth: open, a bit wobbly, mostly delighted */}
      <path
        d="M90 140Q120 147 150 140 150 168 120 175 90 168 90 140Z"
        fill="#5B2A26"
        stroke={ink}
        strokeWidth="4.5"
      />
      <path d="M85 139q-1-8 6-9" stroke={ink} strokeWidth="3.5" />
      <path d="M155 139q1-8-6-9" stroke={ink} strokeWidth="3.5" />

      {/* cream, pouring out of the mouth and down her front */}
      <path
        d="M97 148Q120 156 143 148L145 174C146 188 164 190 172 200 182 212 170 228 152 225 144 234 130 232 124 226 116 234 98 233 90 225 72 229 60 212 74 202 88 194 95 190 95 176Z"
        fill={cream}
        stroke={ink}
        strokeWidth="4.5"
      />
      <path d="M108 164c-3 12 0 22-3 30" stroke={doughShade} strokeWidth="3.4" opacity=".9" />
      <path d="M130 166c3 8 1 16 4 22" stroke={doughShade} strokeWidth="3" opacity=".7" />
      <path d="M78 214c6 4 12 3 15-1M140 220c5 3 11 2 14-2" stroke={doughShade} strokeWidth="3" opacity=".8" />
      {/* a drop making a run for it */}
      <path d="M170 192c-5 8-6 12-2 15 4 2 9-1 7-6-1-3-3-5-5-9z" fill={cream} stroke={ink} strokeWidth="3" />
    </svg>
  )
}
