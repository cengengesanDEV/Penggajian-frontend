import React, {
  useEffect,
  useState,
} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Titles from "../../components/Title";
import moment from "moment";
import {
  Button,
  Col,
  Input,
  Radio,
  Row,
  Typography,
  message,
} from "antd";
import {
  CheckinAbsent,
  CheckoutAbsent,
  getAbsent,
  postKeterangan,
} from "../../utility/axios";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";

function Presensi() {
  const { Title } = Typography;
  const token = useSelector(
    (state) => state.auth.token,
  );

  const [clock, setClock] = useState({
    inTime: null,
    outTime: null,
    date: null,
  });
  const [keterangan, setKeterangan] = useState({
    desc: null,
    status: null,
  });

  const CheckinAPI = () => {
    CheckinAbsent(token)
      .then(() => {
        getAPI();
        message.success("Success check in");
      })
      .catch((err) =>
        message.error(err.response.data.msg),
      );
  };

  const CheckOutAPI = () => {
    if (clock.inTime === null)
      return message.error(
        "please check-in first",
      );
    CheckoutAbsent(token)
      .then(() => {
        getAPI();
        message.success("success check out");
      })
      .catch((err) =>
        message.error(err.response.data.msg),
      );
  };

  const getAPI = () => {
    getAbsent(token)
      .then((res) =>
        setClock({
          inTime: res.data.data.clock_in,
          outTime: res.data.data.clock_out,
          date: res.data.data.date,
        }),
      )
      .catch((err) =>
        message.error("maintance server"),
      );
  };

  useEffect(() => {
    getAPI();
  }, []);

  const izinAPI = () => {
    if (!keterangan.desc) {
      return message.error(
        "Please input keterangan",
      );
    }
    if (!keterangan.status) {
      return message.error("Please input status");
    }
    postKeterangan(keterangan, token)
      .then((res) => {
        message.success(
          `success pengajuan keterangan ${keterangan.status}`,
        );
        setKeterangan({
          desc: null,
          status: null,
        });
      })
      .catch((err) => {
        message.error(err.response.data.msg);
        setKeterangan({
          desc: null,
          status: null,
        });
      });
  };
  return (
    <>
      <Navbar />
      <Titles title={"Presensi"} />

      <div className='container-fluid p-5'>
        <p>
          Date now{" "}
          <b>{moment().format("DD-MM-YYYY")}</b>
        </p>
        <br />
        <Row>
          <Col span={12}>
            <span level={5}>Clock-in : </span>
            <Input
              style={{
                width: "200px",
                marginRight: "10px",
              }}
              value={clock.inTime}
              disabled
              placeholder='Click in to Check-in'
            />
            <Button
              type='primary'
              onClick={CheckinAPI}
            >
              In
            </Button>
          </Col>
          <Col span={12}>
            <span level={5}>Clockout : </span>
            <Input
              style={{
                width: "200px",
                marginRight: "10px",
              }}
              value={clock.outTime}
              disabled
              placeholder='Click out to Check-out'
            />
            <Button
              type='primary'
              danger
              onClick={CheckOutAPI}
            >
              Out
            </Button>
          </Col>
        </Row>

        <br />
        <br />
        <br />

        <Title level={4}>
          Keterangan tidak hadir
        </Title>
        <hr />

        <Row>
          <Col span={24}>
            <Radio.Group
              name='radiogroup'
              value={keterangan.status}
              onChange={(e) =>
                setKeterangan({
                  ...keterangan,
                  status: e.target.value,
                })
              }
            >
              <Radio value='izin'>Izin</Radio>
              <Radio value='sakit'>Sakit</Radio>
            </Radio.Group>
          </Col>
        </Row>

        <br />

        <Row>
          <Col span={24}>
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 120,
                marginBottom: 24,
              }}
              value={keterangan.desc}
              onChange={(e) =>
                setKeterangan({
                  ...keterangan,
                  desc: e.target.value,
                })
              }
              // value={data.note}
              // disabled={disable}
              // onChange={onChange}
              name='note'
              placeholder='Keterangan'
            />
            <Button
              type='primary'
              onClick={izinAPI}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default Presensi;
