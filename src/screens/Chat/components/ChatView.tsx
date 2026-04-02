import { Container, Button, Col, Row, Form, Spinner } from "react-bootstrap";
import { UserRoleImg } from "../../../components";
import searchIcon from "../../../assets/icons/searchIconSvg.svg";
import dotConfig from "../../../assets/icons/dotConfig.svg";
import sendIcon from "../../../assets/icons/send.svg";
import { Colors } from "../../../assets";
import MessageCard from "./MessageCard";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import https from "../../../utils/https";
import { getRoleColor } from "../../../utils/functions";
import { APP_NAME } from "../../../utils/appConfig";

type Props = {
  rolIndex: number | null;
  setMessages: Function;
  message: any;
  handleNewMessage: Function;
  selectedRole: any;
};

const ChatView = (props: Props) => {
  const { rolIndex, message, setMessages, selectedRole } = props;
  const [promptMessage, setPromptMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { refetch: refetchMessages } = useQuery({
    queryKey: ["messages", selectedRole?.idrol],
    queryFn: () => https.getMessagesByRol(selectedRole?.idrol),
  });

  const scrollToTop = () => {
    if (messagesEndRef.current) {
      (messagesEndRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(scrollToTop, [message, loading]);

  const { mutate } = useMutation({
    mutationFn: https.sendMessages,
    onSuccess: () => {
      setLoading(false);
      refetchMessages().then((response) => {
        setMessages(response.data.message);
      });
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    mutate({ query: promptMessage, rol: selectedRole?.idrol });
    setPromptMessage("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.ligthGray.secondary,
      }}
    >
      <div
        className="d-flex flex-row w-100 px-3 justify-content-between align-items-center border-bottom bg-white"
        style={{ height: 75 }}
      >
        {rolIndex !== null ? (
          <UserRoleImg
            name={selectedRole?.name}
            color={getRoleColor(rolIndex)}
            size={30}
            fontSize={14}
            isRowStyle={true}
            aditionalStyles={{ marginTop: "2%" }}
          />
        ) : (
          <div className="d-flex flex-column">
            <span className="fw-bold">{APP_NAME}</span>
            <span className="text-secondary small">Select a role to start chatting.</span>
          </div>
        )}

        <div className="d-flex flex-row align-items-center">
          <img className="mx-1" src={searchIcon} alt="Search" style={{ width: 20, height: 20 }} />
          <img className="mx-1" src={dotConfig} alt="Settings" style={{ width: 20, height: 20 }} />
        </div>
      </div>

      <Container fluid style={{ flex: 1, overflowY: "auto" }}>
        {rolIndex === null ? (
          <div
            style={{
              backgroundColor: Colors.ligthGray.secondary,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 24,
            }}
          >
            <div className="rounded-4 border bg-white p-4 shadow-sm" style={{ maxWidth: 640 }}>
              <div className="badge rounded-pill text-bg-light border text-uppercase mb-3">
                Knowledge workspace
              </div>
              <h2 className="fw-bold mb-3">{APP_NAME} chat room</h2>
              <p className="text-secondary mb-0">
                Select a role to start chatting with the available knowledge areas and
                document workflows.
              </p>
            </div>
          </div>
        ) : (
          message &&
          message.map((item: any, index: number) => (
            <div key={index}>
              <MessageCard isResponse={false} message={item.message} />
              <MessageCard isResponse={true} message={item.response} rolIndex={item.rol} />
            </div>
          ))
        )}

        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </Container>
      <div style={{ padding: "20px" }}>
        {rolIndex !== null && (
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder={`Ask ${APP_NAME}`}
                  value={promptMessage}
                  onChange={(e) => setPromptMessage(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" className="btn btn-secondary">
                  <img
                    src={sendIcon}
                    alt="Send"
                    style={{
                      width: 20,
                      height: 20,
                      fill: Colors.white.primary,
                    }}
                  />
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ChatView;
