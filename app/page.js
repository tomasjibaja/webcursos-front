"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from './globals.css'

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/courses`)
      .then((res) => res.json())
      .then(({ ok, data }) => {
        if (ok) {
          setCourses(data)
        } else {

        }
      })
      .catch((err) => console.log(err))
  }, [])
  console.log({courses})
  return (
    <div style={{ padding: '15px 25px', backgroundColor: '#111', height: '100%' }}>
      <h1>Web de CURSOS 🧠</h1>
        {courses.map((c, i) => (
          <div className="dfc course-container glassy" key={i} style={{styles}}>
            <div className="dfc">
              <Image 
              src={c.thumbnail}
              alt="Portada del curso"
              width={300}
              height={200}
              layout="cover"
              style={{ borderRadius: '3px', border: '1px solid #345' }}
              />
              <div style={{ marginLeft: '7px' }}>
                <h2>{c.name}</h2>
                <h3>Valor: $<span style={{ color: 'limegreen' }}>{c.price}</span></h3>
                <h3 className="c2">Contenidos</h3>
                <ul className="c2" style={{ marginLeft: '16px' }}>
                {c.videos.map((video, index) => (
                  <li key={index}>
                    <h4>{video.title}</h4>
                    <span style={{ fontSize: '12px' }}>Duración: {video.duration}</span>
                    <iframe target='_self' width="600" height="320" frameBorder={'0'} src={video.url} allowfullscreen >
                    </iframe>
                  </li>
                ))
                }
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
    
  );
}
