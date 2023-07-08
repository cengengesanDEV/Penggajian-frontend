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
    lateTime: 0
  });
  const [keterangan, setKeterangan] = useState({
    desc: null,
    status: null,
  });


  let jam = Number(moment().format('hh'))
  const keteranganWaktu = moment().format('a')
  let menit = moment().format('mm')
  let detik = moment().format('ss')

  
  const perhitunganJam = () => {
    // logika absensi jam masuk
    if(keteranganWaktu == 'AM') {
      return {
        inTime: moment().format('hh:mm:ss'),
        outTime: null,
        date: moment().format('YYYY-MM-DD'),
        lateTime: moment().format('hh:mm:ss') > '08:00:00' ? moment().format('hh:mm:ss') < '09:00:00' ? 1 : jam - 8 : 0
      }
    }else{
      return {
        inTime:`${(jam) + 12}:${menit}:${detik}`,
        outTime: null,
        date: moment().format('YYYY-MM-DD'),
        lateTime: jam + 12 - 8
      }
    }
  }

  const CheckinAPI = async () => {
    try {
      const time = await perhitunganJam()
      await CheckinAbsent(time,token)
      await getAPI()
      message.success("Success check in");
        
      } catch (error) {
        message.error(error.response.data.msg)
    }
  };

  const CheckOutAPI = () => {
    if(clock.inTime === null) return message.error('please check-in first')
    let outTime = moment().format('hh:mm:ss')
    let date = moment().format('YYYY-MM-DD')
    if(keteranganWaktu == 'AM') {
        outTime = moment().format('hh:mm:ss')
    }else{
        outTime = `${(jam) + 12}:${menit}:${detik}`
    }
    CheckoutAbsent({outTime,date},token)
    .then(() => {
      getAPI()
      message.success("success check out")
    })
    .catch((err) => message.error(err.response.data.msg))
  }

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
            <span level={5}>Clock-out : </span>
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

        <Title level={4}>Description not present</Title>
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
              <Radio value='izin'>Permission</Radio>
              <Radio value='sakit'>Sick</Radio>
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
              placeholder='please write down your statement of permission'
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
