$user = 'paul'
$password = 'EmmaDog12!'
$pair = "$($user):$($password)"
$bytes = [System.Text.Encoding]::ASCII.GetBytes($pair)
$base64 = [System.Convert]::ToBase64String($bytes)
$basicAuthValue = "Basic $base64"
$headers = @{ Authorization = $basicAuthValue }
# $response = Invoke-WebRequest -Headers $headers -uri "http://localhost:5984/guitar/_design/md/_view/full?key=%22open_chord:E%22"
$response = Invoke-WebRequest -Headers $headers -uri "http://localhost:5984/guitar/_design/md/_view/full"

if ($response.StatusCode -eq '200') {
  $json = ConvertFrom-Json $response.Content
  foreach ($row in $json.rows) {
    $file = $($row.id).Replace(":", "-").Replace("/", "-")
    $filename = Join-Path '.\content\practice\chords' "$file.md"
    $row.value | out-file -Encoding ascii $filename
  }
}