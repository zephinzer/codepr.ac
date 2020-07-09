import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Workbench({ dispatch, history, match, state }) {
  const { platform, owner, repo } = match.params;
  const searchParams = new URLSearchParams(history.location.search);
  const commitSha = searchParams.get("ref");
  const path = searchParams.get("path");
  return (
    <div className="page-workbench">
      <h1>Workbench</h1>
    </div>
  );
});
