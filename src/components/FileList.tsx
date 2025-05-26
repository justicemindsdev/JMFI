import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

type FileObject = {
  name: string
  [key: string]: any
}

export default function FileList() {
  const [files, setFiles] = useState<FileObject[]>([])

  useEffect(() => {
    async function fetchFiles() {
      const { data, error } = await supabase
        .storage
        .from('user-uploads') // ✅ your bucket name
        .list('')             // ✅ root folder (since file is not in a subfolder)

      if (error) {
        console.error('Error listing files:', error)
      } else {
        console.log('Files:', data)
        setFiles(data)
      }
    }

    fetchFiles()
  }, [])

  return (
    <div>
      <h2>Files in user-uploads</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  )
}
