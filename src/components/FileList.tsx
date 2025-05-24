// FileList.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

const BUCKET_NAME = 'user-uplods'

export default function FileList() {
  type FileObject = { name: string; [key: string]: any }
  const [files, setFiles] = useState<FileObject[]>([])

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
        limit: 100,
        offset: 0,
        // sortBy: { column: 'name', order: 'asc' }
      })

      if (error) {
        console.error('Error fetching files:', error)
      } else {
        setFiles(data)
      }
    }

    fetchFiles()
  }, [])

  const getFileUrl = async (fileName) => {
    const { data } = await supabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return data?.publicUrl
  }

  return (
    <div>
      <h2>Files in Bucket</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name} –{' '}
            <a
              href={`https://iraynmibzknhmwjuoqfu.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${file.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
