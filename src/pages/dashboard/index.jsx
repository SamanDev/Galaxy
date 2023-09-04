import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Image, Grid } from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
import GameInbox from "./GameInbox";
function SegmentExamplePlaceholderInline(prop) {
  return (
    <>
      <div className="container-md">
        <Segment basic>
          <div style={{ height: 10, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                zIndex: 0,
                top: -130,
                width: "100%",
                textAlign: "center",
                opacity: 0.8,
                filter: " drop-shadow(1px 1px 5px #ffffff)",
              }}
            >
              <AnimIcon
                icon="ilpmnyul"
                width="350px"
                height="500px"
                trigger="hover"
                stroke="4"
                colors="primary:#ffffff,secondary:#343c42"
              />
            </div>
          </div>
          <div className="text-center">
            <Header icon>
              <Icon>
                <Image
                  src="/assets/images/logo.webp"
                  centered
                  style={{
                    width: "30vw",
                    maxWidth: "200px",
                    marginTop: 80,

                    filter:
                      " drop-shadow(1px 1px 30px #ffffff) drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 3px rgb(0 0 0 / 1)) drop-shadow(1px 1px 10px rgb(0 0 0 / 6))",
                  }}
                />
              </Icon>
              <h1 className="text-center opacity-50">
                <strong
                  className="farsi fw-bold fs-5"
                  style={{
                    position: "relative",
                    top: -50,
                    color: "rgba(255,255,255,1)",
                    filter:
                      "drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 5px rgb(0 0 0 / 1))",
                  }}
                >
                  گلکسی کازینو
                </strong>
              </h1>
            </Header>
          </div>

          <Segment
            inverted
            raised
            className="fadeoust"
            style={{
              background: "rgba(0,0,0,.5)",

              overflow: "hidden",
              height: 250,
            }}
          >
            <div
              style={{
                height: 200,
                position: "relative",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",

                  top: -10,
                }}
                className="d-none d-sm-block"
              >
                <AnimIcon
                  icon={"ajnotayw"}
                  width={200}
                  height={200}
                  delay="5500"
                  stroke="10"
                />
              </div>

              <div
                className=" p-10 farsi"
                style={{
                  fontSize: 20,
                  padding: 20,
                }}
              >
                <h1 className="farsi text-gold fs-5">گلکسی کازینو </h1>
                <h2 className="farsi lh-base fs-6">
                  معتبرترین و بهترین اپلیکیشن
                  <br /> پوکر، انفجار، تخته نرد، بلک جک، رولت و انواع اسلات با
                  پول واقعی در ایران
                </h2>
                <Segment.Inline className="text-end">
                  <Button
                    basic
                    color="yellow"
                    size="large"
                    className="farsi"
                    onClick={() => $("#openRegister").trigger("click")}
                  >
                    ثبت نام در گلکسی کازینو
                  </Button>
                </Segment.Inline>{" "}
              </div>
            </div>
          </Segment>
          <GameInbox {...prop} />

          <div
            className="fadeoutend"
            style={{ height: 120, position: "relative" }}
          >
            <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
              <AnimIcon
                icon="hciqteio"
                width="300px"
                height="140px"
                trigger="loop"
              />
            </div>
          </div>

          <Segment inverted padded="very" className="fadeoutend">
            <Grid reversed="computer tablet">
              <Grid.Column mobile={16} tablet={10} computer={10}>
                <div className="farsi">
                  <h3 className="farsi">بازی پوکر آنلاین با پول واقعی</h3>
                  <p className="lh-base">
                    سلام، به سایت گلکسی کازینو خوش آمدید. در اینجا، شما می
                    توانید بازی های پوکر آنلاین را با بازیکنانی از سراسر جهان
                    تجربه کنید. با امکانات پیشرفته و رابط کاربری ساده، شما می
                    توانید به راحتی بازی کنید و تجربه یک بازی پوکر واقعی را
                    داشته باشید.
                  </p>
                  <p className="lh-base">
                    در گلکسی کازینو، شما می توانید به انواع بازی های پوکر از
                    جمله تگزاس هولدم، اوماها، سوپر ستود و... دسترسی پیدا کنید.
                    همچنین، با شرکت در مسابقات و رقابت های مختلف، می توانید به
                    عنوان یک بازیکن حرفه ای در پوکر به شهرت و پول برسید.
                  </p>
                  <p className="lh-base">
                    در گلکسی کازینو، امنیت شما برای ما بسیار مهم است و به همین
                    دلیل، با استفاده از فناوری های پیشرفته از جمله رمزنگاری،
                    اطلاعات شما را محافظت می کنیم. بنابراین، با اطمینان کامل می
                    توانید بازی کنید و لذت ببرید.
                  </p>
                </div>
                <br />
                <Segment.Inline className="text-end">
                  <Button
                    basic
                    color="yellow"
                    size="large"
                    className="farsi"
                    onClick={() => $("#openRegister").trigger("click")}
                  >
                    ثبت نام در گلکسی کازینو
                  </Button>
                </Segment.Inline>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={6} computer={6}>
                <Image
                  src="/assets/images/pkr.webp"
                  width="100"
                  height="100"
                  alt="بازی پوکر آنلاین با پول واقعی"
                  fluid
                  rounded
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment inverted padded="very" className="fadeoutend">
            <Grid>
              <Grid.Column mobile={16} tablet={10} computer={10}>
                <div className="farsi">
                  <h4 className="farsi">
                    شارژ حساب و برداشت آسان در گلکسی کازینو{" "}
                  </h4>
                  <p className="lh-base">
                    برای شارژ حساب و کشوت (برداشت) در سایت گلکسی کازینو می
                    توانید از طریق درگاه بانکی اقدام کنید و یا از سایت های
                    ایرانی خرید و فروش اتوماتیک ووچر پرفکت مانی ، اقدام به خرید
                    ووچر کرده و کد ووچرتان را در صفحه دیپازیت سایت وارد کنید تا
                    بلافاصله اکانتتان معادل رقم آن ووچر شارژ گردد. علاوه بر آن
                    می توانید از بیت کوین برای بازی پوکر آنلاین استفاده کنید.
                  </p>
                  <p className="lh-base">
                    در هنگام کشوت از گلکسی کازینو هم بسته به گزینه انتخابی تان
                    یا به صورت واریز شتاب به کارت بانکی تان پرداخت صورت می گیرد
                    و یا معادل رقم درخواستی جهت برداشت یک ووچر در صفحه تراکنش
                    تان به شما داده می شود.
                  </p>
                </div>
                <br />
                <Segment.Inline className="text-end">
                  <Button
                    basic
                    color="yellow"
                    size="large"
                    className="farsi"
                    onClick={() => $("#openRegister").trigger("click")}
                  >
                    ثبت نام در گلکسی کازینو
                  </Button>
                </Segment.Inline>{" "}
                <br /> <br />
              </Grid.Column>
              <Grid.Column tablet={6} computer={6} only="tablet computer">
                <Image
                  src="/assets/images/cash.webp"
                  width="70"
                  height="56"
                  alt="شارژ حساب و برداشت آسان در گلکسی کازینو"
                  fluid
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment inverted padded="very" className="fadeoutend">
            <Grid reversed="computer tablet">
              <Grid.Column mobile={16} tablet={10} computer={10}>
                <div className="farsi">
                  <h2 className="farsi">
                    انواع بازی های کازینویی با پول واقعی
                  </h2>
                  <p className="lh-base">
                    در سایت گلکسی کازینو می توانید از انواع بازی های کازینویی
                    مانند{" "}
                    <strong className="farsi fw-bold fs-6 text-gold">
                      انفجار، تخته نرد، بلک جک، رولت و انواع اسلات
                    </strong>{" "}
                    را به صورت آنلاین بازی کنید و از طریق درگاه برداشت کنید.
                  </p>
                  <br />
                  <Segment.Inline className="text-end">
                    <Button
                      basic
                      color="yellow"
                      size="large"
                      className="farsi"
                      onClick={() => $("#openRegister").trigger("click")}
                    >
                      ثبت نام در گلکسی کازینو
                    </Button>
                  </Segment.Inline>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={6} computer={6}>
                <Image
                  src="/assets/images/cas.gif"
                  width="100"
                  height="100"
                  alt="انواع بازی های کازینویی با پول واقعی"
                  fluid
                  rounded
                  bordered
                />
                <br />
                <br />
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment>

        <br />
        <br />

        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default SegmentExamplePlaceholderInline;
