# Convert to MathML and save to temp file
(Get-Content 'static\flashcards\DiscreteMath_in.txt') -replace '$', '<br />' | pandoc -f html+tex_math_dollars -t html --mathml --columns=300 -o junk.txt

# Remove <br />, except in multi-line answers
enum LineType {
    Separator
    Obverse
    Reverse
}
$deck = Get-Content .\junk.txt
[LineType]$lineType = [LineType]::Separator

for ($i = 0; $i -lt $deck.Count; $i++) {
    if ($deck[$i] -eq '<br />') {
        $lineType = [LineType]::Separator
        $deck[$i] = ''
    }
    elseif ($deck[$i] -match '(.+)<br />' ) {
        if ($lineType -eq [LineType]::Separator) {
            $lineType = [LineType]::Obverse
            $deck[$i] = $Matches[1]
        } else {
            $lineType = [LineType]::Reverse
            if (($i + 1) -eq $deck.Count -or $deck[$i + 1] -eq '<br />') { 
                $deck[$i] = $Matches[1]
            }
        }
    }
}

$deck | Out-File -Force -Encoding utf8 'static\flashcards\DiscreteMath.txt'