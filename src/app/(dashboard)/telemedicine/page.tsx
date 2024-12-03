"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Space, Tabs, Form, Input, message, Row, Col } from 'antd';
import {
  VideoCameraOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';
import Peer from 'simple-peer';
import PrescriptionForm from '@/components/prescriptions/PrescriptionForm';
import LabTestForm from '@/components/lab/LabTestForm';
import ComponentLoader from '@/components/common/ComponentLoader';
import '@/styles/telemedicine.css';
import ChatBox from '@/components/chat/ChatBox';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface ConsultationNotes {
  patientId: string;
  notes: string;
  timestamp: string;
}

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

const TelemedicinePage = () => {
  const [loading, setLoading] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [notes, setNotes] = useState<ConsultationNotes[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);

  const startCall = async () => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize peer connection
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', data => {
        // Here you would send the signal data to the other peer
        console.log('Signal data:', data);
      });

      peer.on('stream', stream => {
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      peerRef.current = peer;
      setInCall(true);
    } catch (error) {
      console.error('Failed to start call:', error);
      message.error('Failed to start video call');
    } finally {
      setLoading(false);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    setLocalStream(null);
    setRemoteStream(null);
    setInCall(false);
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoMuted(!videoTrack.enabled);
    }
  };

  const handleSaveNotes = async (values: any) => {
    const newNote = {
      patientId: 'current-patient-id',
      notes: values.notes,
      timestamp: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    message.success('Notes saved successfully');
  };

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'Doctor',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="telemedicine-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Video Consultation" className="video-card">
            <div className="video-container">
              {inCall ? (
                <>
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="video-stream local"
                  />
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="video-stream remote"
                  />
                </>
              ) : (
                <div className="video-placeholder">
                  <VideoCameraAddOutlined />
                  <p>Click Start to begin video consultation</p>
                </div>
              )}
            </div>
            <div className="video-controls">
              <Space>
                <Button
                  type="primary"
                  icon={<VideoCameraOutlined />}
                  onClick={inCall ? endCall : startCall}
                  loading={loading}
                >
                  {inCall ? 'End Call' : 'Start Call'}
                </Button>
                <Button
                  icon={isAudioMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
                  onClick={toggleAudio}
                  disabled={!inCall}
                >
                  {isAudioMuted ? 'Unmute' : 'Mute'}
                </Button>
                <Button
                  icon={<VideoCameraOutlined />}
                  onClick={toggleVideo}
                  disabled={!inCall}
                >
                  {isVideoMuted ? 'Show Video' : 'Hide Video'}
                </Button>
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Tabs defaultActiveKey="chat">
            <TabPane 
              tab={<span><MessageOutlined />Chat</span>}
              key="chat"
            >
              <Card className="chat-card">
                <ChatBox
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </Card>
            </TabPane>
            <TabPane 
              tab={<span><FileTextOutlined />Notes</span>}
              key="notes"
            >
              <Card>
                <Form onFinish={handleSaveNotes}>
                  <Form.Item
                    name="notes"
                    rules={[{ required: true, message: 'Please enter notes' }]}
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="Enter consultation notes..."
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Notes
                    </Button>
                  </Form.Item>
                </Form>
                <div className="notes-list">
                  {notes.map((note, index) => (
                    <Card key={index} size="small" className="note-card">
                      <p>{note.notes}</p>
                      <small>{new Date(note.timestamp).toLocaleString()}</small>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={12}>
          <Card title="Digital Prescription">
            <PrescriptionForm
              onSubmit={async (values) => {
                // Handle prescription submission
                message.success('Prescription created successfully');
              }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Lab Test Orders">
            <LabTestForm
              onSubmit={async (values) => {
                // Handle lab test order submission
                message.success('Lab test ordered successfully');
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TelemedicinePage; 