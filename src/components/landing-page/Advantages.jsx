import React from "react";

const Advantages = () => {
  return (
    <section className="advantages-container container">
      <div className="heading">
        <div className="chip">
          <img src="/icons/chip.svg" alt="chip" />
          <span>Advantage</span>
        </div>

        <h2>Built for Accuracy, Speed, and Scale</h2>
        <p>
          We don’t just extract data; we are here to perfect your business
          processes alongside you and elevate your decision confidence.
        </p>
      </div>

      <div className="advantages-grid">
        <div className="card template-free">
          <div className="card-title">
            <h5>Template-Free Processing</h5>
            <p>Process any document variation without rigid templates.</p>
          </div>

          <div className="bottom-graphics">
            {/* the bordered container, pinned to the bottom of the card */}
            <div className="tf-panel">
              {/* Frame 2: doc enters from the right, exits to the left */}
              <img
                className="tf-doc"
                src="/images/template-process/DOC.svg"
                alt=""
              />

              {/* Frame 2: Drag & Drop + Summaries slide up from the bottom */}
              <div className="tf-scene tf-scene-drop">
                <div className="tf-btn tf-btn-dark">Drag &amp; Drop</div>
                <p className="tf-label">Summaries</p>
                <div className="tf-track" />
              </div>

              {/* Frame 3: Document uploading… + half-processed summaries + Analyzing */}
              <div className="tf-scene tf-scene-upload">
                <div className="tf-btn tf-btn-dark">Document uploading...</div>
                <p className="tf-label">Summaries</p>
                <img
                  className="tf-bars"
                  src="/images/template-process/progressing.png"
                  alt=""
                />
                <span className="tf-pill tf-pill-a">Analyzing</span>
              </div>

              {/* Frame 4: fully processed summaries + Generate */}
              <div className="tf-scene tf-scene-done">
                <img
                  className="tf-bars"
                  src="/images/template-process/progressed.png"
                  alt=""
                />
                <span className="tf-pill tf-pill-b">Analyzing</span>
                <span className="tf-pill tf-pill-c">Analyzing</span>
                <div className="tf-btn tf-btn-generate">Generate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card modal-card">
          <div className="card-title">
            <h5>Proprietary, patented "Model Garden</h5>
            <p>
              We've built a "Model Garden" of ML models that handles diverse
              industry document types out-of-the-box beyond generalist models.
            </p>
          </div>

          <div className="bottom-graphics">
            <div className="mg-frame">
              <img src="/images/model-garden/frame.svg" alt="" />

              <div className="mg-skeletons">
                <span className="mg-block mg-block-1" />
                <span className="mg-block mg-block-2" />
                <span className="mg-block mg-block-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="card comparison-card">
          <div className="card-title">
            <h5>3-Way Comparison & Discrepancy Detection</h5>
            <p>
              Spot issues fast with side-by-side view of original files,
              extracted data, and AI outputs, plus smart search for mismatches.
            </p>
          </div>

          <div className="bottom-graphics">
            <div className="cp-stage">
              {/* 2. dotted branches (right group is mirrored in CSS) */}
              <div className="cp-lines cp-lines-l">
                <i className="cp-mid" />
                <i className="cp-vert" />
                <i className="cp-top" />
                <i className="cp-bot" />
              </div>
              <div className="cp-lines cp-lines-r">
                <i className="cp-mid" />
                <i className="cp-vert" />
                <i className="cp-top" />
                <i className="cp-bot" />
              </div>

              {/* 1. logo rises from the bottom */}
              <img
                className="cp-logo"
                src="/images/comparison/logo.svg"
                alt=""
              />

              {/* 3. chips pop in all at once */}
              <span className="cp-chip cp-orange cp-l1">Flexibility</span>
              <span className="cp-chip cp-green  cp-l2">Compliance</span>
              <span className="cp-chip cp-blue   cp-l3">Accuracy</span>

              <span className="cp-chip cp-white cp-r1">Financial</span>
              <span className="cp-chip cp-white cp-r2">Banking</span>
              <span className="cp-chip cp-white cp-r3">Insurance</span>
            </div>
          </div>
        </div>

        <div className="card agentic-card">
          <div className="card-title">
            <h5>Agentic AI & Generative Workflows</h5>
            <p>
              Go beyond extraction, auto-generate policies, claims
              communications, and structured reports from complex inputs.
            </p>
          </div>

          <div className="bottom-graphics">
            <div className="ag-stage">
              {/* 1. AI circle rises from the bottom */}
              <img className="ag-ai" src="/images/agentic/ai.svg" alt="" />

              {/* 2. branch lines: center, two L's, two long horizontals */}
              <span className="ag-v ag-v-c" />

              <span className="ag-h ag-h-l" />
              <span className="ag-v ag-v-l" />

              <span className="ag-h ag-h-r" />
              <span className="ag-v ag-v-r" />

              <span className="ag-far ag-far-l" />
              <span className="ag-far ag-far-r" />

              {/* 3. a file at the end of every branch */}
              <img
                className="ag-file ag-file-c"
                src="/images/agentic/file.svg"
                alt=""
              />
              <img
                className="ag-file ag-file-l"
                src="/images/agentic/file.svg"
                alt=""
              />
              <img
                className="ag-file ag-file-r"
                src="/images/agentic/file.svg"
                alt=""
              />
              <img
                className="ag-file ag-file-fl"
                src="/images/agentic/file.svg"
                alt=""
              />
              <img
                className="ag-file ag-file-fr"
                src="/images/agentic/file.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="card learning-card">
          <div className="card-title">
            <h5>Human-in-the-Loop & Active Learning</h5>
            <p>
              Built-in review system that learns from every correction, steadily
              improving accuracy as you scale.
            </p>
          </div>

          <div className="bottom-graphics">
            <div className="lc-stage">
              {/* 1 -> 2 -> 3 flow */}
              <div className="lc-flow">
                <div className="lc-step lc-step-1">
                  <img src="/images/learning/Unit_1.svg" alt="" />
                  <p className="lc-label">1. Review</p>
                </div>

                <span className="lc-arrow lc-arrow-1">
                  <i />
                  <img src="/images/learning/1.svg" alt="" />
                  <i />
                </span>

                <div className="lc-step lc-step-2">
                  <img src="/images/learning/Unit_2.svg" alt="" />
                  <p className="lc-label">2. Correction</p>
                </div>

                <span className="lc-arrow lc-arrow-2">
                  <i />
                  <img src="/images/learning/1.svg" alt="" />
                  <i />
                </span>

                <div className="lc-step lc-step-3">
                  <img src="/images/learning/Unit_3.svg" alt="" />
                  <p className="lc-label">3. Learns</p>
                </div>
              </div>

              {/* CTA + its two curved arrows slide up together */}
              <div className="lc-cta-group">
                <span className="lc-curve lc-curve-l" />
                <span className="lc-curve lc-curve-r" />
                <div className="lc-cta">Accuracy improve over time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card seamless-card">
          <div className="card-title">
            <h5>Modular Customization & Seamless Integration</h5>
            <p>
              Fully modular platform that fits your rules and pushes validated
              data directly into your core systems.
            </p>
          </div>

          <div className="bottom-graphics">
            <div className="sm-stage">
              {/* 2. branches: stem + two diagonal arrows per side */}
              <span className="sm-stem sm-stem-l" />
              <span className="sm-stem sm-stem-r" />

              <span className="sm-diag sm-diag-lu" />
              <span className="sm-diag sm-diag-ld" />
              <span className="sm-diag sm-diag-ru" />
              <span className="sm-diag sm-diag-rd" />

              {/* 1. logo rises from the bottom */}
              <img className="sm-logo" src="/images/seamless/logo.svg" alt="" />

              {/* 3. a file at the end of every branch */}
              <img
                className="sm-file sm-file-lu"
                src="/images/seamless/file.svg"
                alt=""
              />
              <img
                className="sm-file sm-file-ld"
                src="/images/seamless/file.svg"
                alt=""
              />
              <img
                className="sm-file sm-file-ru"
                src="/images/seamless/file.svg"
                alt=""
              />
              <img
                className="sm-file sm-file-rd"
                src="/images/seamless/file.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
